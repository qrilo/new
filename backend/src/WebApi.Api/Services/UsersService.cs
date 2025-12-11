using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MyApp.Data;
using MyApp.Data.Entities;
using WebApi.Api.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyApp.Data.Enums;
using WebApi.Api.Exceptions;
using WebApi.Api.Models.Request;
using WebApi.Api.Models.Response;
using WebApi.Api.Models.Response.Users;
using LoginRequest = WebApi.Api.Models.Request.LoginRequest;

namespace WebApi.Api.Services;

public class UsersService : IUsersService
{
    private readonly DatabaseContext _databaseContext;
    private readonly IConfiguration _configuration;
    private readonly ICurrentUserService _currentUserService;

    public UsersService(
        DatabaseContext databaseContext, 
        IConfiguration configuration,
        ICurrentUserService currentUserService)
    {
        _databaseContext = databaseContext;
        _configuration = configuration;
        _currentUserService = currentUserService;
    }
    
    public async Task<LoginResponse> Login(LoginRequest request)
    {
        var user = await _databaseContext.Users
            .FirstOrDefaultAsync(u => u.Username == request.Username);

        if (user is null)
        {
            throw new NotFoundException("User not found");
        };

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            throw new ValidationException("Invalid credentials");
        }

        var jwtKey = _configuration["Jwt:Key"];
        var jwtIssuer = _configuration["Jwt:Issuer"];
        var accessTokenLifetime = int.Parse(_configuration["Jwt:UserTokenLifetime"]);
        
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username),
            new Claim("id", user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: null,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(accessTokenLifetime),
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        
        return new LoginResponse
        {
            Id = user.Id,
            Token = jwt,
            Role = user.Role.ToString(),
        };
    }

    public async Task<CreateUserResponse> Register(CreateUserRequest request)
    {
        var currentUserId = _currentUserService.UserId;

        var currentUser = await _databaseContext.Users
            .FirstOrDefaultAsync(u => u.Id == currentUserId);

        if (currentUser is null)
            throw new ForbiddenException("Current user not found");

        var newUserRole = ToUserRole(request.Role);
        if (newUserRole is null)
            throw new ValidationException("Invalid role specified");

        if (currentUser.Role == UserRole.Admin && newUserRole != UserRole.User)
        {
            throw new ForbiddenException("Admin can only create users with role 'User'");
        }
        
        if (currentUser.Role == UserRole.User)
        {
            throw new ForbiddenException("User cannot create other users");
        }
        
        var existingUser = await _databaseContext.Users
            .FirstOrDefaultAsync(u => u.Username == request.Username);
        if (existingUser is not null)
        {
            throw new ValidationException("User with this username already exists");
        }
        
        var newUser = new User
        {
            Username = request.Username,
            Fullname = request.Fullname,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password), 
            Role = newUserRole.Value
        };
        
        _databaseContext.Users.Add(newUser);
        await _databaseContext.SaveChangesAsync();

        return new CreateUserResponse()
        {
            Id = newUser.Id,
            Fullname = newUser.Fullname,
            Username = newUser.Username,
            Role = newUserRole.Value
        };
    }

    public async Task<LoginBankResponse> LoginBank(LoginBankRequest request)
    {
        var bank = await _databaseContext.Banks.FirstOrDefaultAsync(bank => bank.Code == request.Code);
        if (bank is null)
        {
            throw new NotFoundException("Bank not found");
        }
        
        var jwtKey = _configuration["Jwt:Key"];
        var jwtIssuer = _configuration["Jwt:Issuer"];
        var accessTokenLifetime = int.Parse(_configuration["Jwt:BankTokenLifetime"]);
        
        var claims = new[]
        {
            new Claim("bankId", bank.Id.ToString()),
            new Claim(ClaimTypes.Role, UserRole.Bank.ToString()),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: null,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(accessTokenLifetime),
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        
        return new LoginBankResponse()
        {
            Token = jwt,
            Role = UserRole.Bank.ToString(),
            PinLength = bank.PinLength,
            BankId = bank.Id
        };
    }

    public async Task<ICollection<UserResponse>> GetAdmins()
    {
        var admins = await _databaseContext.Users.Where(u => u.Role == UserRole.Admin).ToArrayAsync();
        
        var response = admins.Select(user => new UserResponse()
        {
            Id = user.Id,
            Fullname = user.Fullname,
            Username = user.Username,
            Role = user.Role,
        }).ToArray();

        return response;
    }

    private static UserRole? ToUserRole(CreateUserRole createUserRole)
    {
        return createUserRole switch
        {
            CreateUserRole.Admin => UserRole.Admin,
            CreateUserRole.User => UserRole.User,
            _ => null
        };
    }
}