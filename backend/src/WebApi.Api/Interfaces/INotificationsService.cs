using MyApp.Data.Entities;
using WebApi.Api.Models.Request.Notifications;
using WebApi.Api.Models.Response.Notifications;

namespace WebApi.Api.Interfaces;

public interface INotificationsService
{
    Task<NotificationResponse> CreateNotification(Guid bankId, CreateNotificationRequest request);
    Task<NotificationResponse> UpdateNotification(Guid id, UpdateNotificationRequest request);
    Task DeleteNotification(Guid id);
    Task<ICollection<NotificationResponse>> GetNotificationsByBankId(Guid bankId);
}