using MyApp.Data.Enums;

namespace WebApi.Api.Models.Response;

public class CreateUserResponse
{
    public Guid Id { get; set; }
    public  string Username { get; set; }
    public string? Fullname { get; set; }
    public UserRole Role { get; set; }
}