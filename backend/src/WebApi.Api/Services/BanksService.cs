using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Data.Entities;
using MyApp.Data.Enums;
using WebApi.Api.Exceptions;
using WebApi.Api.Interfaces;
using WebApi.Api.Models.Request.Banks;
using WebApi.Api.Models.Response.Accounts;
using WebApi.Api.Models.Response.Banks;
using WebApi.Api.Models.Response.Contacts;
using WebApi.Api.Models.Response.Expenses;
using WebApi.Api.Models.Response.Notifications;
using WebApi.Api.Models.Response.Transactions;

namespace WebApi.Api.Services;

public class BanksService : IBanksService
{
    public readonly DatabaseContext _databaseContext;
    public readonly ICurrentUserService _currentUserService;
    
    public BanksService(
        DatabaseContext databaseContext,
        ICurrentUserService currentUserService)
    {
        _databaseContext = databaseContext;
        _currentUserService = currentUserService;
    }

    public async Task<ICollection<BankResponse>> GetBanks(GetBanksRequest request)
    {
        var user = await _databaseContext.Users.FirstOrDefaultAsync(u => u.Id == _currentUserService.UserId);
        if (user is null)
        {
            throw new NotFoundException("User not found");
        }

        var query = _databaseContext.Banks
            .AsNoTracking();
    
        if (request.BankType is not BankType.NONE)
        {
            query = query.Where(b => b.BankType == request.BankType);
        }
        query = query.Include(bank => bank.Contact)
            .Include(bank => bank.Expenses);
        
        var banks = await query.Where(bank => bank.UserId == user.Id).ToArrayAsync();
        
        var response = banks.Select(bank => new BankResponse
        {
            Id = bank.Id,
            Phone = bank.Phone,
            Comment = bank.Comment,
            PinLength = bank.PinLength,
            Fullname = bank.Fullname,
            Email = bank.Email,
            Code = bank.Code,
            Contact = new ContactResponse()
            {
                Id = bank.Contact.Id,
                Phone = bank.Contact.Phone,
                Fullname = bank.Contact.Fullname,
            },
            Expenses = bank.Expenses.Select(expense =>
            {
                return new ExpenseResponse()
                {
                    Id = expense.Id,
                    Name = expense.Name,
                    Amount = expense.Amount,
                };
            }).ToArray(),
        }).ToArray();

        return response;
    }

    public async Task<BankResponse> CreateBank(CreateBankRequest request)
    {
        var user = await _databaseContext.Users.FirstOrDefaultAsync(user => user.Id == _currentUserService.UserId);
        if (user is null)
        {
            throw new NotFoundException("User not found");
        }
        
        var uniqueCode = await GenerateUniqueCodeAsync();

        var bank = new Bank()
        {
            Code = uniqueCode,
            Comment = request.Comment,
            Email = request.Email,
            Phone = request.Phone,
            PinLength = request.PinLength,
            Fullname = request.Fullname,
            BankType = request.BankType,
            UserId = user.Id,
            Expenses = request.Expenses.Select(expense =>
            {
                return new Expense()
                {
                    Amount = expense.Amount,
                    Name = expense.Name,
                };
            }).ToList(),
            Contact = new Contact()
            {
                Fullname = request.Contact.Fullname,
                Phone = request.Contact.Phone
            }
        };
        
        await _databaseContext.Banks.AddAsync(bank);
        await _databaseContext.SaveChangesAsync();

        return new BankResponse()
        {
            Id = bank.Id,
            Phone = bank.Phone,
            Comment = bank.Comment,
            PinLength = bank.PinLength,
            Fullname = bank.Fullname,
            Email = bank.Email,
            Contact = new ContactResponse()
            {
                Id = bank.Contact.Id,
                Phone = bank.Contact.Phone,
                Fullname = bank.Contact.Fullname,
            },
            Expenses = bank.Expenses.Select(expense =>
            {
                return new ExpenseResponse()
                {
                    Id = expense.Id,
                    Name = expense.Name,
                    Amount = expense.Amount,
                };
            }).ToArray()
        };
    }

    public async Task<BankResponse> UpdateBank(Guid id, UpdateBankRequest request)
    {
        var user = await _databaseContext.Users.FirstOrDefaultAsync(user => user.Id == _currentUserService.UserId);
        if (user is null)
        {
            throw new NotFoundException("User not found");
        }
        
        var bank = await _databaseContext.Banks
            .Include(bank => bank.Expenses)
            .Include(bank => bank.Contact)
            .FirstOrDefaultAsync(bank => bank.Id == id);
        
        if (bank is null)
        {
            throw new NotFoundException("Bank not found");
        }

        if (bank.UserId != user.Id)
        {
            throw new ForbiddenException("Access denied");
        }
        
        bank.Phone = request.Phone;
        bank.Email = request.Email;
        bank.Fullname = request.Fullname;
        bank.Comment = request.Comment;
        bank.PinLength = request.PinLength;
        
        if (request.Contact is not null)
        {
            bank.Contact = new Contact()
            {
                Id = request.Contact.Id,
                Phone = request.Contact.Phone,
                Fullname = request.Contact.Fullname
            };
        }

        if (request.Expenses is not null && request.Expenses.Any())
        {
            var expensesToRemove = bank.Expenses
                .Where(expense => !request.Expenses.Any(r => r.Id == expense.Id))
                .ToList();

            foreach (var expense in expensesToRemove)
            {
                bank.Expenses.Remove(expense);
            }

            foreach (var expense in request.Expenses)
            {
                var existingExpense = bank.Expenses.FirstOrDefault(e => e.Id == expense.Id);
                if (existingExpense != null)
                {
                    existingExpense.Name = expense.Name;
                    existingExpense.Amount = expense.Amount;
                }
                else
                {
                    bank.Expenses.Add(new Expense
                    {
                        Id = expense.Id,
                        Name = expense.Name,
                        Amount = expense.Amount
                    });
                }
            }
        }

        await _databaseContext.SaveChangesAsync();
        
        return new BankResponse()
        {
            Id = bank.Id,
            Phone = bank.Phone,
            Comment = bank.Comment,
            PinLength = bank.PinLength,
            Fullname = bank.Fullname,
            Email = bank.Email,
            Contact = new ContactResponse()
            {
                Id = bank.Contact.Id,
                Phone = bank.Contact.Phone,
                Fullname = bank.Contact.Fullname,
            },
            Expenses = bank.Expenses.Select(expense =>
            {
                return new ExpenseResponse()
                {
                    Id = expense.Id,
                    Name = expense.Name,
                    Amount = expense.Amount,
                };
            }).ToArray()
        };
    }

    public async Task DeleteBank(Guid id)
    {
        var bank = await _databaseContext.Banks
            .Include(bank => bank.User)
            .Include(bank => bank.Expenses)
            .Include(bank => bank.Contact)
            .Include(bank => bank.Accounts)
            .Include(bank => bank.Notifications)
            .FirstOrDefaultAsync(bank => bank.Id == id && bank.UserId == _currentUserService.UserId);
        
        if (bank is null)
        {
            throw new NotFoundException("Bank not found");
        } 
        
        _databaseContext.Banks.Remove(bank);   
         await _databaseContext.SaveChangesAsync();
    }

    public async Task<BankResponse> GetBank()
    {
        var bank = await _databaseContext.Banks
            .Include(bank => bank.Expenses)
            .Include(bank => bank.Contact)
            .Include(bank => bank.Accounts)
            .ThenInclude(account => account.Expenses)
            .Include(bank => bank.Accounts)
            .ThenInclude(account => account.Transactions)
            .Include(bank => bank.Notifications)
            .FirstOrDefaultAsync(bank => bank.Id == _currentUserService.BankId);
        
        if (bank is null)
        {
            throw new NotFoundException("Bank not found");
        }

        return new BankResponse()
        {
            Id = bank.Id,
            Fullname = bank.Fullname,
            PinLength = bank.PinLength,
            Code = bank.Code,
            Expenses = bank.Expenses.Select(expense => new ExpenseResponse()
            {
                Id = expense.Id,
                Name = expense.Name,
                Amount = expense.Amount,
            }).ToArray(),
            Contact = new ContactResponse()
            {
                Id = bank.Contact.Id,
                Phone = bank.Contact.Phone,
                Fullname = bank.Contact.Fullname,
            },
            Accounts =  bank.Accounts
                .OrderBy(account => account.CreateAtUtc)
                .Select(account => new AccountResponse()
            {
                Id = account.Id,
                Name = account.Name,
                Balance = account.Balance,
                Hash = account.Hash,
                ShowNewPayment = account.ShowNewPayment,
                Expenses = account.Expenses?.Select(expense => new ExpenseResponse()
                {
                    Id = expense.Id,
                    Name = expense.Name,
                    Amount = expense.Amount,
                }).ToArray(),
                Transactions = account.Transactions?.Select(transaction => new TransactionResponse()
                {
                    Id = transaction.Id,
                    Name = transaction.Name,
                    Amount = transaction.Amount,
                    Description = transaction.Description,
                    Type = transaction.Type,
                    Date = transaction.Date,
                    TransactionType = transaction.TransactionType,
                }).ToArray()
            }).ToArray(),
            Notifications = bank.Notifications?.Select(notification => new NotificationResponse()
            {
                Id = notification.Id,
                Name = notification.Name,
                Date = notification.Date,
                Description = notification.Description,
            }).ToArray(),
        };
    }

    private async Task<int> GenerateUniqueCodeAsync()
    {
        var random = new Random();

        int code;
        bool exists;

        do
        {
            code = random.Next(100000, 999999); 
            exists = await _databaseContext.Banks.AnyAsync(u => u.Code == code);
        }
        while (exists);

        return code;
    }
}