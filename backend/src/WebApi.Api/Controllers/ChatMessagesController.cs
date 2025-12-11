using Microsoft.AspNetCore.Mvc;
using MyApp.Data.Enums;
using WebApi.Api.Attributes;
using WebApi.Api.Interfaces;
using WebApi.Api.Models.Request.ChatMessages;
using WebApi.Api.Models.Response.ChatMessages;

namespace WebApi.Api.Controllers;

[ApiController]
[Route("api/chat-messages")]
public class ChatMessagesController  : ControllerBase
{
    private readonly IChatMessagesService _chatMessagesService;
    
    public ChatMessagesController(IChatMessagesService chatMessagesService)
    {
        _chatMessagesService = chatMessagesService;
    }
    
    [HttpGet]
    [AuthorizeRole(UserRole.SuperAdmin, UserRole.Admin, UserRole.Bank)]
    [ProducesResponseType(typeof(ChatMessagesResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetChatMessages([FromQuery] ChatMessageRequest request)
    {
        var result = await _chatMessagesService.GetChatMessages(request);
        return Ok(result);
    }


    [HttpPost]
    [AuthorizeRole(UserRole.SuperAdmin, UserRole.Admin, UserRole.Bank)]
    [ProducesResponseType(typeof(ICollection<ChatMessageResponse>), StatusCodes.Status200OK)]
    public async Task<IActionResult> CreateChatMessage([FromBody] CreateChatMessageRequest request)
    {
        var result = await _chatMessagesService.CreateChatMessage(request);
        return Ok(result);
    }
}