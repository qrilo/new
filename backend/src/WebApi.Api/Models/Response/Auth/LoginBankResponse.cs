namespace WebApi.Api.Models.Response;

public class LoginBankResponse
{
    public string Token { get; set; }
    public string Role { get; set; }
    public int PinLength { get; set; }
    public Guid BankId { get; set; }
}