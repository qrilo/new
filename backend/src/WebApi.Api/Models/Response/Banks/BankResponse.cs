using WebApi.Api.Models.Response.Accounts;
using WebApi.Api.Models.Response.ChatMessages;
using WebApi.Api.Models.Response.Contacts;
using WebApi.Api.Models.Response.Expenses;
using WebApi.Api.Models.Response.Notifications;

namespace WebApi.Api.Models.Response.Banks;

public class BankResponse
{
    public Guid Id { get; set; }
    public string Fullname { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Comment { get; set; }
    public int PinLength { get; set; }
    public int Code { get; set; }
    public ICollection<ExpenseResponse>? Expenses { get; set; }
    public ICollection<AccountResponse>? Accounts { get; set; }
    public ICollection<NotificationResponse>? Notifications { get; set; }
    public ContactResponse? Contact { get; set; }
    public ICollection<ChatMessageResponse>? Messages { get; set; }
}