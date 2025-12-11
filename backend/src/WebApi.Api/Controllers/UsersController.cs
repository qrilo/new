using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MyApp.Data.Enums;
using WebApi.Api.Attributes;
using WebApi.Api.Interfaces;

namespace WebApi.Api.Controllers;

[ApiController]
[Route("api/users")]
[AuthorizeRole(UserRole.SuperAdmin, UserRole.Admin)]
public class UsersController : ControllerBase
{
    private readonly IUsersService _usersService;
    
    public UsersController(IUsersService usersService)
    {
        _usersService = usersService;
    }

    [HttpGet("admins")]
    public async Task<IActionResult> GetAdmins()
    {
        var result = await _usersService.GetAdmins();
        return Ok(result);
    }
}