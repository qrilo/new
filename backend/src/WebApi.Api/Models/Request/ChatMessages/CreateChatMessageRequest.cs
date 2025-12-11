namespace WebApi.Api.Models.Request.ChatMessages;

public class CreateChatMessageRequest
{
    public string Message { get; set; }
    public Guid? ReceiverId { get; set; }
}