using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Data.Entities;
using WebApi.Api.Exceptions;
using WebApi.Api.Interfaces;
using WebApi.Api.Models.Request.Transactions;
using WebApi.Api.Models.Response.Transactions;

namespace WebApi.Api.Services;

public class TransactionsService : ITransactionsService
{
    private readonly DatabaseContext _databaseContext;
    private readonly ICurrentUserService _currentUserService;

    public TransactionsService(
        DatabaseContext databaseContext,
        ICurrentUserService currentUserService)
    {
        _databaseContext = databaseContext;
        _currentUserService = currentUserService;
    }

    public async Task<ICollection<TransactionResponse>> GetTransactionByAccountId(Guid accountId)
    {
        var transactions = await _databaseContext.Transactions
            .Include(transaction => transaction.Account)
            .ThenInclude(account => account.Bank)
            .Where(transaction => transaction.AccountId == accountId 
                                  && transaction.Account.Bank.UserId == _currentUserService.UserId)
            .ToArrayAsync();
        
        var response = transactions.Select(bank => new TransactionResponse
        {
            Id = bank.Id,
            Date = bank.Date,
            Description = bank.Description,
            Amount = bank.Amount,
            Type = bank.Type,
            TransactionType = bank.TransactionType,
            Name = bank.Name,
        }).ToArray();

        return response;
    }

    public async Task<TransactionResponse> CreateTransaction(Guid accountId, CreateTransactionRequest request)
    {
        var account = await _databaseContext.Accounts
            .Include(account => account.Bank)
            .FirstOrDefaultAsync(account => account.Id == accountId);
        
        if (account is null)
        {
            throw new NotFoundException("Account not found");
        }

        if (account.Bank.UserId != _currentUserService.UserId)
        {
            throw new ForbiddenException("Access denied");
        }

        var transaction = new Transaction()
        {
            Amount = request.Amount,
            AccountId = account.Id,
            Date = request.Date,
            Description = request.Description,
            Name = request.Name,
            Type = request.Type,
            TransactionType = request.TransactionType 
        };
        
        _databaseContext.Transactions.Add(transaction);
        await _databaseContext.SaveChangesAsync();

        return new TransactionResponse()
        {
            Id = transaction.Id,
            Date = transaction.Date,
            Description = transaction.Description,
            Name = transaction.Name,
            Type = transaction.Type,
            Amount = transaction.Amount,
            TransactionType = transaction.TransactionType
        };
    }

    public async Task<TransactionResponse> UpdateTransaction(Guid id, UpdateTransactionRequest request)
    {
        var transaction = await _databaseContext.Transactions
            .Include(transaction => transaction.Account)
            .ThenInclude(account => account.Bank)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (transaction is null)
        {
            throw new NotFoundException("Transaction not found");
        }

        if (transaction.Account.Bank.UserId != _currentUserService.UserId)
        {
            throw new ForbiddenException("Access denied");
        }

        transaction.Amount = request.Amount;
        transaction.Date = request.Date;
        transaction.Description = request.Description;
        transaction.Name = request.Name;
        transaction.Type = request.Type;
        transaction.TransactionType = request.TrasactionType;
        
        _databaseContext.Transactions.Update(transaction);
        await _databaseContext.SaveChangesAsync();
        
        return new TransactionResponse()
        {
            Id = transaction.Id,
            Date = transaction.Date,
            Description = transaction.Description,
            Name = transaction.Name,
            Type = transaction.Type,
            Amount = transaction.Amount,
            TransactionType = transaction.TransactionType
        };
    }

    public async Task DeleteTransaction(Guid id)
    {
        var transaction = await _databaseContext.Transactions
            .Include(transaction => transaction.Account)
            .ThenInclude(account => account.Bank)
            .FirstOrDefaultAsync(t => t.Id == id);
        
        if (transaction is null)
        {
            throw new NotFoundException("Transaction not found");
        }

        if (transaction.Account.Bank.UserId != _currentUserService.UserId)
        {
            throw new ForbiddenException("Access denied");
        }
        
        _databaseContext.Transactions.Remove(transaction);
        await _databaseContext.SaveChangesAsync();
    }
}