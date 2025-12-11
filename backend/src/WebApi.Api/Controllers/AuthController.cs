using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyApp.Data.Enums;
using WebApi.Api.Attributes;
using WebApi.Api.Interfaces;
using WebApi.Api.Models.Request;
using WebApi.Api.Models.Response;
using LoginRequest = WebApi.Api.Models.Request.LoginRequest;

namespace WebApi.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUsersService _usersService;
    private readonly ICurrentUserService _currentUserService;

    public AuthController(IUsersService usersService, 
        ICurrentUserService currentUserService)
    {
        _usersService = usersService;
        _currentUserService = currentUserService;
    }
    
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var response = await _usersService.Login(request);
        return Ok(response);
    }
    
    [HttpPost("register")]
    [AuthorizeRole(UserRole.SuperAdmin, UserRole.Admin)]
    [ProducesResponseType(typeof(CreateUserResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> Register([FromBody] CreateUserRequest request)
    {
        await _usersService.Register(request);
        return Ok();
    }
    
    
    [AllowAnonymous]
    [HttpPost("bank")]
    [AuthorizeRole(UserRole.SuperAdmin, UserRole.Admin)]
    [ProducesResponseType(typeof(CreateUserResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> Register([FromBody] LoginBankRequest request)
    {
        var result = await _usersService.LoginBank(request);
        return Ok(result);
    }
    
    [HttpPost("temp")]
    [ProducesResponseType(typeof(Response), StatusCodes.Status200OK)]
    public IActionResult GetId()
    {
        return Ok(new Response()
        {
            Id = _currentUserService.UserId,
            Role = _currentUserService.Role
        });
    }
}

class Response
{
    public Guid? Id { get; set; }
    public UserRole Role { get; set; }
}