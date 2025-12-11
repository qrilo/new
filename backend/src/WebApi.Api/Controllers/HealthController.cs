using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Api.Interfaces;

namespace WebApi.Api.Controllers;

[ApiController]
[Route("api/health")]
public class HealthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    
    public HealthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetHealth()
    {
        return Ok(new { status = "Healthy" });
    }
    
    [AllowAnonymous]
    [HttpGet("cors")]
    public async Task<IActionResult> GetCors()
    {
        var allowedOrigins = _configuration.GetSection("Jwt:AllowedOrigins").Get<string[]>();

        return Ok(new { allowerCors = allowedOrigins });
    }
}