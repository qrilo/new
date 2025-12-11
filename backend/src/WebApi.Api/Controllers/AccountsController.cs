using Microsoft.AspNetCore.Mvc;
using MyApp.Data.Enums;
using WebApi.Api.Attributes;
using WebApi.Api.Interfaces;
using WebApi.Api.Models.Request.Accounts;
using WebApi.Api.Models.Request.Transactions;

namespace WebApi.Api.Controllers;

[ApiController]
[Route("api/accounts")]
public class AccountsController : ControllerBase
{
    private readonly IAccountsService _accountsService;
    private readonly ITransactionsService _transactionsService;
    
    public AccountsController(
        IAccountsService accountsService,
        ITransactionsService transactionsService)
    {
        _accountsService = accountsService;
        _transactionsService = transactionsService;
    }

    [HttpGet("{id:guid}")]
    [AuthorizeRole(UserRole.Bank)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _accountsService.GetAccountById(id);
        return Ok(result);
    }

    [HttpPut("{id:guid}")]
    [AuthorizeRole(UserRole.SuperAdmin, UserRole.Admin)]
    public async Task<IActionResult> UpdateAccount([FromRoute] Guid id, UpdateAccountRequest request)
    {
        var result = await _accountsService.UpdateAccount(id, request);
        return Ok(result);
    }

    [HttpDelete("{id:guid}")]
    [AuthorizeRole(UserRole.SuperAdmin, UserRole.Admin)]
    public async Task<IActionResult> DeleteAccount([FromRoute] Guid id)
    {
        await _accountsService.DeleteAccount(id);
        return Ok();
    }

    [HttpPost("{id:guid}/transactions")]
    [AuthorizeRole(UserRole.SuperAdmin, UserRole.Admin)]
    public async Task<IActionResult> CreateTransaction([FromRoute] Guid id, CreateTransactionRequest request)
    {
        var result = await _transactionsService.CreateTransaction(id, request);
        return Ok(result);
    }

    [HttpGet("{id:guid}/transactions")]
    [AuthorizeRole(UserRole.SuperAdmin, UserRole.Admin)]
    public async Task<IActionResult> GetTransactions([FromRoute] Guid id)
    {
        var result = await _transactionsService.GetTransactionByAccountId(id);
        return Ok(result);
    }
}