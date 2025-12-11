namespace WebApi.Api.Models.Response;

public class LoginResponse
{
    public Guid? Id { get; set; }
    public string Token { get; set; }
    public string Role { get; set; }
}