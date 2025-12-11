namespace WebApi.Api.Models.Response.Notifications;

public class NotificationResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
}