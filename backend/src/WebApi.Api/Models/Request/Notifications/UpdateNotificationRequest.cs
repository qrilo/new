namespace WebApi.Api.Models.Request.Notifications;

public class UpdateNotificationRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
}