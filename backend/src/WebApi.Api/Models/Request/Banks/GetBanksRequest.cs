using MyApp.Data.Enums;

namespace WebApi.Api.Models.Request.Banks;

public class GetBanksRequest
{
    public BankType BankType { get; set; }
}