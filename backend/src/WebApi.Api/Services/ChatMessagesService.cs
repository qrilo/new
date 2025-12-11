using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Data.Entities;
using MyApp.Data.Enums;
using WebApi.Api.Exceptions;
using WebApi.Api.Interfaces;
using WebApi.Api.Models.Request.ChatMessages;
using WebApi.Api.Models.Response.ChatMessages;

namespace WebApi.Api.Services;

public class ChatMessagesService : IChatMessagesService
{
    private readonly DatabaseContext _databaseContext;
    private readonly ICurrentUserService _currentUserService;
    
    public ChatMessagesService(
        DatabaseContext databaseContext,
        ICurrentUserService currentUserService)
    {
        _databaseContext = databaseContext;
        _currentUserService = currentUserService;
    }
    
    public async Task<ChatMessageResponse> CreateChatMessage(CreateChatMessageRequest request)
    {
        if (_currentUserService.Role == UserRole.Bank)
        {
            var bankSender = await _databaseContext.Banks
                .Include(bank => bank.User)
                .AsNoTracking()
                .FirstOrDefaultAsync(bank => bank.Id == _currentUserService.BankId);

            if (bankSender is null)
            {
                throw new NotFoundException("Sender not found");  
            }

            var chatMessageBankSender = new ChatMessage
            {
                ManagerId = bankSender.User.Id,
                Message = request.Message,
                ClientId = bankSender.Id,
                SenderRole = SenderRole.Bank,
            };
            await _databaseContext.ChatMessages.AddAsync(chatMessageBankSender);
            await _databaseContext.SaveChangesAsync();

            return new ChatMessageResponse()
            {
                Id = chatMessageBankSender.Id,
                Message = chatMessageBankSender.Message,
                SenderRole = chatMessageBankSender.SenderRole,
                ClientId = chatMessageBankSender.ClientId,
                ManagerId = chatMessageBankSender.ManagerId,
            };
        }

        var bankReceiver  = await _databaseContext.Banks
            .Include(bank => bank.User)
            .AsNoTracking()
            .FirstOrDefaultAsync(bank => bank.Id == request.ReceiverId);

        if (bankReceiver is null)
        {
            throw new NotFoundException("Receiver not found");
        }

        if (bankReceiver.User.Id != _currentUserService.UserId)
        {
            throw new ForbiddenException("Access denied");
        }
        
        var chatMessageUserSender = new ChatMessage
        {
            ManagerId = bankReceiver.User.Id,
            Message = request.Message,
            ClientId = bankReceiver.Id,
            SenderRole = SenderRole.User,
        };
        await _databaseContext.ChatMessages.AddAsync(chatMessageUserSender);
        await _databaseContext.SaveChangesAsync();
        
        return new ChatMessageResponse()
        {
            Id = chatMessageUserSender.Id,
            Message = chatMessageUserSender.Message,
            SenderRole = chatMessageUserSender.SenderRole,
            ClientId = chatMessageUserSender.ClientId,
            ManagerId = chatMessageUserSender.ManagerId,
        };
    }

    public async Task<ChatMessagesResponse> GetChatMessages(ChatMessageRequest chatMessageRequest)
    {
        var bankAccount = _currentUserService.Role == UserRole.Bank
            ? await _databaseContext.Banks
                .Include(bank => bank.User)
                .AsNoTracking()
                .FirstOrDefaultAsync(bank => bank.Id == _currentUserService.BankId)
            : await _databaseContext.Banks
                .Include(bank => bank.User)
                .AsNoTracking()
                .FirstOrDefaultAsync(bank => bank.Id == chatMessageRequest.ReceiverId);

        if (bankAccount is null)
        {
            throw new NotFoundException("Bank not found");
        }

        var chatMessages = await _databaseContext.ChatMessages
            .Include(c => c.Manager)
            .Include(c => c.Client)
            .Where(c => (c.ManagerId == bankAccount.User.Id && c.ClientId == bankAccount.Id) ||
                        (c.ClientId == bankAccount.Id && c.ManagerId == bankAccount.User.Id))
            .OrderBy(c => c.CreateAtUtc)
            .ToArrayAsync();

        return new ChatMessagesResponse
        {
            Messages = chatMessages.Select(chatMessage => new ChatMessageResponse
            {
                Id = chatMessage.Id,
                Message = chatMessage.Message,
                SenderRole = chatMessage.SenderRole,
                ClientId = chatMessage.ClientId,
                ManagerId = chatMessage.ManagerId
            }).ToArray()
        };
    }

}