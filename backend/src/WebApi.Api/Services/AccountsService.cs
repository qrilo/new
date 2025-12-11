using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Data.Entities;
using MyApp.Data.Enums;
using WebApi.Api.Exceptions;
using WebApi.Api.Interfaces;
using WebApi.Api.Models.Request.Accounts;
using WebApi.Api.Models.Response.Accounts;
using WebApi.Api.Models.Response.Expenses;
using WebApi.Api.Models.Response.Transactions;

namespace WebApi.Api.Services;

public class AccountsService : IAccountsService
{
    private readonly DatabaseContext _databaseContext;
    private readonly ICurrentUserService _currentUserService;
    
    public AccountsService(
        DatabaseContext databaseContext,
        ICurrentUserService currentUserService)
    {
        _databaseContext = databaseContext;
        _currentUserService = currentUserService;
    }

    public async Task<AccountResponse> CreateAccount(Guid bankId, CreateAccountRequest request)
    {
        var bank = await _databaseContext.Banks
            .FirstOrDefaultAsync(bank => bank.Id == bankId && bank.UserId == _currentUserService.UserId);

        if (bank is null)
        {
            throw new NotFoundException("Bank not found");
        }

        var account = new Account()
        {
            Name = request.Name,
            Balance = request.Balance,
            Hash = request.Hash,
            ShowNewPayment = request.ShowNewPayment,
            BankId = bank.Id,
            Expenses = request.Expenses?.Select(expense =>
            {
                return new Expense()
                {
                    Name = expense.Name,
                    Amount = expense.Amount,
                };
            }).ToArray()
        };
        
        _databaseContext.Accounts.Add(account);
        await _databaseContext.SaveChangesAsync();

        return new AccountResponse()
        {
            Id = account.Id,
            Balance = account.Balance,
            Hash = account.Hash,
            ShowNewPayment = account.ShowNewPayment,
            Name = account.Name,
            Expenses = account.Expenses?.Select(expense =>
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

    public async Task<AccountResponse> UpdateAccount(Guid accountId, UpdateAccountRequest request)
    {
        var account = await _databaseContext.Accounts
            .Include(account => account.Bank)
            .Include(account => account.Expenses)
            .FirstOrDefaultAsync(a => a.Id == accountId);

        if (account is null)
        {
            throw new NotFoundException("Account not found");
        }

        if (_currentUserService.UserId != account.Bank.UserId)
        {
            throw new ForbiddenException("Access denied");
        }
        
        account.Name = request.Name;
        account.Balance = request.Balance;
        account.ShowNewPayment = request.ShowNewPayment;
        account.Hash = request.Hash;
        
        if (request.Expenses is not null)
        {
            foreach (var expenseRequest in request.Expenses)
            {
                var existingExpense = account.Expenses.FirstOrDefault(e => e.Id == expenseRequest.Id);

                if (existingExpense != null)
                {
                    existingExpense.Name = expenseRequest.Name;
                    existingExpense.Amount = expenseRequest.Amount;
                }
                else
                {
                    var newExpense = new Expense
                    {
                        Id = expenseRequest.Id,
                        Name = expenseRequest.Name,
                        Amount = expenseRequest.Amount,
                        AccountId = account.Id
                    };
                    account.Expenses.Add(newExpense);
                }
            }
        }
        
        _databaseContext.Accounts.Update(account);
        await _databaseContext.SaveChangesAsync();
        
        return new AccountResponse()
        {
            Id = account.Id,
            Balance = account.Balance,
            Hash = account.Hash,
            ShowNewPayment = account.ShowNewPayment,
            Name = account.Name,
            Expenses = account.Expenses.Select(expense =>
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

    public async Task DeleteAccount(Guid accountId)
    {
        var account = await _databaseContext.Accounts
            .Include(account => account.Bank)
            .Include(account => account.Expenses)
            .FirstOrDefaultAsync(a => a.Id == accountId);
        
        if (account is null)
        {
            throw new NotFoundException("Account not found");
        }
        
        if (_currentUserService.UserId != account.Bank.UserId)
        {
            throw new ForbiddenException("Access denied");
        }
        
        _databaseContext.Accounts.Remove(account);
        await _databaseContext.SaveChangesAsync();
    }

    public async Task<ICollection<AccountResponse>> GetAccountsByBankId(Guid bankId)
    {
        var accounts = await _databaseContext.Accounts
            .Include(account => account.Bank)
            .Include(account => account.Transactions)
            .Include(account => account.Expenses)
            .Where(account => account.BankId == bankId
            && account.Bank.UserId == _currentUserService.UserId)
            .ToArrayAsync();
        
        var response = accounts
            .OrderBy(account => account.CreateAtUtc)
            .Select(account => new AccountResponse() 
            {
                Id = account.Id,
                Name = account.Name,
                Balance = account.Balance,
                Hash = account.Hash,
                ShowNewPayment = account.ShowNewPayment,
                Transactions = account.Transactions.Select(transaction =>
                {
                   return new TransactionResponse()
                    {
                        Id = transaction.Id,
                        Type = transaction.Type,
                        Amount = transaction.Amount,
                        Date = transaction.Date,
                        Description = transaction.Description,
                        Name = transaction.Name,
                        TransactionType = transaction.TransactionType
                    };
                }).ToArray(),
                Expenses = account.Expenses.Select(expense =>
                {
                    return new ExpenseResponse()
                    {
                        Id = expense.Id,
                        Name = expense.Name,
                        Amount = expense.Amount,
                    };
                }).ToArray()
            }).ToArray();

        return response;
    }

    public async Task<AccountResponse> GetAccountById(Guid accountId)
    {
        var query = _databaseContext.Accounts
            .Include(account => account.Bank)
            .Include(account => account.Expenses)
            .Include(account => account.Transactions)
            .AsQueryable();
            
        if (UserRole.Bank == _currentUserService.Role)
        {
            query = query
                .Where(account => account.Id == accountId && account.Bank.Id == _currentUserService.BankId);
        }

        if (UserRole.Admin == _currentUserService.Role)
        {
            query = query
                .Where(account => account.Id == accountId && account.Bank.UserId == _currentUserService.UserId);
        }

        var account = await query.FirstOrDefaultAsync();

        if (account is null)
        {
            throw new NotFoundException("Account not found");
        }

        return new AccountResponse()
        {
            Id = account.Id,
            Balance = account.Balance,
            Hash = account.Hash,
            ShowNewPayment = account.ShowNewPayment,
            Name = account.Name,
            Expenses = account.Expenses?.Select(expense => new ExpenseResponse()
            {
                Id = expense.Id,
                Name = expense.Name,
                Amount = expense.Amount,
            }).ToArray(),
            Transactions = account.Transactions.Select(transaction => new TransactionResponse()
            {
                Id = transaction.Id,
                Type = transaction.Type,
                Amount = transaction.Amount,
                Date = transaction.Date,
                Description = transaction.Description,
                Name = transaction.Name,
                TransactionType = transaction.TransactionType
            }).ToArray()
        };
    }
}