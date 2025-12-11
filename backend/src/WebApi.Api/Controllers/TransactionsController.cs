using Microsoft.AspNetCore.Mvc;
using MyApp.Data.Enums;
using WebApi.Api.Attributes;
using WebApi.Api.Interfaces;
using WebApi.Api.Models.Request.Transactions;

namespace WebApi.Api.Controllers;

[ApiController]
[Route("api/transactions")]
[AuthorizeRole(UserRole.SuperAdmin, UserRole.Admin)]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionsService _transactionsService;
    
    public TransactionsController(ITransactionsService transactionsService)
    {
        _transactionsService = transactionsService;
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateTransaction([FromRoute] Guid id, UpdateTransactionRequest request)
    {
        var result = await _transactionsService.UpdateTransaction(id, request);
        return Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteTransaction([FromRoute] Guid id)
    {
        await _transactionsService.DeleteTransaction(id);
        return Ok();
    }
}