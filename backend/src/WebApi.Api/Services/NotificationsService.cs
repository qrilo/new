using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Data.Entities;
using WebApi.Api.Exceptions;
using WebApi.Api.Interfaces;
using WebApi.Api.Models.Request.Notifications;
using WebApi.Api.Models.Response.Notifications;

namespace WebApi.Api.Services;

public class NotificationsService : INotificationsService
{
    private readonly DatabaseContext _databaseContext;
    private readonly ICurrentUserService _currentUserService;
    
    public NotificationsService(
        DatabaseContext databaseContext,
        ICurrentUserService currentUserService)
    {
        _databaseContext = databaseContext; 
        _currentUserService = currentUserService;
    }

    public async Task<NotificationResponse> CreateNotification(Guid bankId, CreateNotificationRequest request)
    {
        var bank = await _databaseContext.Banks
            .FirstOrDefaultAsync(bank => bank.Id == bankId && bank.UserId == _currentUserService.UserId);
        if (bank is null)
        {
            throw new NotFoundException("Bank is not found");
        }

        var notification = new Notification()
        { 
            Name = request.Name,
            BankId = bank.Id,
            Date = request.Date,
            Description = request.Description
        };
        
        _databaseContext.Notifications.Add(notification);
        await _databaseContext.SaveChangesAsync();

        return new NotificationResponse()
        {
            Id = notification.Id,
            Name = notification.Name,
            Date = notification.Date,
            Description = notification.Description
        };
    }

    public async Task<NotificationResponse> UpdateNotification(Guid id, UpdateNotificationRequest request)
    {
        var notification = await _databaseContext.Notifications
            .Include(notification => notification.Bank)
            .FirstOrDefaultAsync(notification => notification.Id == id && notification.Bank.UserId == _currentUserService.UserId);

        if (notification is null)
        {
            throw new NotFoundException("Notification is not found");
        }

        notification.Name = request.Name;
        notification.Date = request.Date;
        notification.Description = request.Description;
        
        _databaseContext.Notifications.Update(notification);
        await _databaseContext.SaveChangesAsync();
        
        return new NotificationResponse()
        {
            Id = notification.Id,
            Name = notification.Name,
            Date = notification.Date,
            Description = notification.Description
        };
    }

    public async Task DeleteNotification(Guid id)
    {
        var notification = await _databaseContext.Notifications
            .Include(notification => notification.Bank)
            .FirstOrDefaultAsync(notification => notification.Id == id && notification.Bank.UserId == _currentUserService.UserId);

        if (notification is null)
        {
            throw new NotFoundException("Notification is not found");
        }
        
        _databaseContext.Notifications.Remove(notification);
        await _databaseContext.SaveChangesAsync();
    }

    public async Task<ICollection<NotificationResponse>> GetNotificationsByBankId(Guid bankId)
    {
        var notifications = await _databaseContext.Notifications
            .Include(notification => notification.Bank)
            .Where(notification => notification.BankId == bankId && notification.Bank.UserId == _currentUserService.UserId)
            .ToArrayAsync();
        
        var response = notifications.Select(bank => new NotificationResponse()
        {
            Id = bank.Id,
            Date = bank.Date,
            Description = bank.Description,
            Name = bank.Name,
        }).ToArray();

        return response;
    }
}