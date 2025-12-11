using WebApi.Api.Models.Request.ChatMessages;
using WebApi.Api.Models.Response.ChatMessages;

namespace WebApi.Api.Interfaces;

public interface IChatMessagesService
{
    Task<ChatMessageResponse> CreateChatMessage(CreateChatMessageRequest request);
    Task<ChatMessagesResponse> GetChatMessages(ChatMessageRequest request);
}