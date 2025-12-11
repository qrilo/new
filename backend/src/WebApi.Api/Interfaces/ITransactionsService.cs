using WebApi.Api.Models.Request.Transactions;
using WebApi.Api.Models.Response.Transactions;

namespace WebApi.Api.Interfaces;

public interface ITransactionsService
{
    Task<ICollection<TransactionResponse>> GetTransactionByAccountId(Guid accountId);
    Task<TransactionResponse> CreateTransaction(Guid accountId, CreateTransactionRequest request);
    Task<TransactionResponse> UpdateTransaction(Guid id, UpdateTransactionRequest request);
    Task DeleteTransaction(Guid id);
}