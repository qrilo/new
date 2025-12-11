using WebApi.Api.Models.Request.Banks;
using WebApi.Api.Models.Response.Banks;

namespace WebApi.Api.Interfaces;

public interface IBanksService
{
    Task<ICollection<BankResponse>> GetBanks(GetBanksRequest request);
    Task<BankResponse> CreateBank(CreateBankRequest request);
    Task<BankResponse> UpdateBank(Guid id, UpdateBankRequest request);
    Task DeleteBank(Guid id);
    Task<BankResponse> GetBank();
}