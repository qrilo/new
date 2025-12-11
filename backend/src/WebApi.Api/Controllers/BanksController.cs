using Microsoft.AspNetCore.Mvc;
using MyApp.Data.Enums;
using WebApi.Api.Attributes;
using WebApi.Api.Interfaces;
using WebApi.Api.Models.Request.Accounts;
using WebApi.Api.Models.Request.Banks;
using WebApi.Api.Models.Request.Notifications;
using WebApi.Api.Models.Response.Banks;

namespace WebApi.Api.Controllers;

[ApiController]
[Route("api/banks")]
public class BanksController : ControllerBase
{
    private readonly IBanksService _banksService;
    private readonly IAccountsService _accountsService;
    private readonly INotificationsService _notificationsService;

    public BanksController(
        IBanksService banksService,
        IAccountsService accountsService,
        INotificationsService notificationsService)
    {
        _banksService = banksService;
        _accountsService = accountsService;
        _notificationsService = notificationsService;
    }
    
    [HttpGet]
    [AuthorizeRole(UserRole.SuperAdmin, UserRole.Admin)]
    [ProducesResponseType(typeof(ICollection<BankResponse>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetBanks([FromQuery] GetBanksRequest request)
    {
        var result = await _banksService.GetBanks(request);
        return Ok(result);
    }
    
    [HttpPost]
    [AuthorizeRole(UserRole.SuperAdmin, UserRole.Admin)]
    [ProducesResponseType(typeof(BankResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> CreateBank([FromBody] CreateBankRequest request)
    {
        var result = await _banksService.CreateBank(request);
        return Ok(result);
    }
    
    [HttpPut("{id:guid}")]
    [AuthorizeRole(UserRole.SuperAdmin, UserRole.Admin)]
    [ProducesResponseType(typeof(BankResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateBak([FromRoute] Guid  id, [FromBody] UpdateBankRequest request)
    {
        var result = await _banksService.UpdateBank(id, request);
        return Ok(result);
    }

    [HttpDelete("{id:guid}")]
    [AuthorizeRole(UserRole.Admin)]
    public async Task<IActionResult> DeleteBank([FromRoute] Guid id)
    {
        await _banksService.DeleteBank(id);
        return Ok();
    }
    
    [HttpGet("/api/bank")]
    [AuthorizeRole(UserRole.Bank)]
    [ProducesResponseType(typeof(BankResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetBank()
    {
        var result = await _banksService.GetBank();
        return Ok(result);
    }
    
    [HttpPost("{id:guid}/accounts")]
    public async Task<IActionResult> CreateAccount([FromRoute] Guid id, [FromBody]CreateAccountRequest request)
    {
        var result = await _accountsService.CreateAccount(id, request);
        return Ok(result);
    }

    [HttpGet("{id:guid}/accounts")]
    public async Task<IActionResult> GetAccounts([FromRoute] Guid id)
    {
        var result = await _accountsService.GetAccountsByBankId(id);
        return Ok(result);
    }
    
    [HttpGet("{id:guid}/notifications")]
    public async Task<IActionResult> GetNotifications([FromRoute] Guid id)
    {
        var result = await _notificationsService.GetNotificationsByBankId(id);
        return Ok(result);
    }

    [HttpPost("{id:guid}/notifications")]
    public async Task<IActionResult> CreateNotification([FromRoute] Guid id,
        [FromBody] CreateNotificationRequest request)
    {
        var result = await _notificationsService.CreateNotification(id, request);
        return Ok(result);
    }
}