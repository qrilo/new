using MyApp.Data.Enums;

namespace WebApi.Api.Models.Response.Users;

public class UserResponse
{
    public Guid Id { get; set; }
    public  string Username { get; set; }
    public string? Fullname { get; set; }
    public string PasswordHash { get; set; }
    public UserRole Role { get; set; }
}