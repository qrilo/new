using MyApp.Data.Enums;
using WebApi.Api.Models.Response.Banks;
using WebApi.Api.Models.Response.Users;

namespace WebApi.Api.Models.Response.ChatMessages;

public class ChatMessageResponse
{
    public Guid Id { get; set; }
    public string Message { get; set; }
    public Guid ManagerId { get; set; }
    public UserResponse Manager { get; set; }
    public Guid ClientId { get; set; }
    public BankResponse Client { get; set; }
    public SenderRole SenderRole { get; set; }
}