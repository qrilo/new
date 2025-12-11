using Microsoft.AspNetCore.Mvc;
using MyApp.Data.Enums;
using WebApi.Api.Attributes;
using WebApi.Api.Interfaces;
using WebApi.Api.Models.Request.Notifications;
using WebApi.Api.Models.Response.Notifications;

namespace WebApi.Api.Controllers;

[ApiController]
[Route("api/notifications")]
[AuthorizeRole(UserRole.SuperAdmin, UserRole.Admin)]
public class NotificationsController : ControllerBase
{
    private readonly INotificationsService _notificationsService;
    
    public NotificationsController(INotificationsService notificationsService)
    {
        _notificationsService = notificationsService;
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateNotification([FromRoute] Guid id, [FromBody] UpdateNotificationRequest request)
    {
        var result = await _notificationsService.UpdateNotification(id, request);
        return Ok(result);
    }
    
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> UpdateNotification([FromRoute] Guid id)
    {
        await _notificationsService.DeleteNotification(id);
        return Ok();
    }
}