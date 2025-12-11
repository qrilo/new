using WebApi.Api.Models.Request.Accounts;
using WebApi.Api.Models.Response.Accounts;

namespace WebApi.Api.Interfaces;

public interface IAccountsService
{
    Task<AccountResponse> CreateAccount(Guid bankId, CreateAccountRequest request);
    Task<AccountResponse> UpdateAccount(Guid accountId, UpdateAccountRequest request);
    Task DeleteAccount(Guid accountId);
    Task<ICollection<AccountResponse>> GetAccountsByBankId(Guid bankId);
    Task<AccountResponse> GetAccountById(Guid accountId);
}