namespace WebApi.Api.Models.Request;

public class CreateUserRequest
{
    public string Username { get; set; }
    public string Fullname { get; set; }
    public string Password { get; set; }
    public CreateUserRole Role { get; set; }
}

public enum CreateUserRole
{
    Admin = 1,
    User = 2
}