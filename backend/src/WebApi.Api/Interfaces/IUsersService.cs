using WebApi.Api.Models.Request;
using WebApi.Api.Models.Response;
using WebApi.Api.Models.Response.Users;

namespace WebApi.Api.Interfaces;

public interface IUsersService
{
    Task<LoginResponse> Login(LoginRequest request);
    Task<CreateUserResponse> Register(CreateUserRequest request);
    Task<LoginBankResponse> LoginBank(LoginBankRequest request);
    Task<ICollection<UserResponse>> GetAdmins();
}