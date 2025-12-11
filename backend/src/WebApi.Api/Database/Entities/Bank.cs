using MyApp.Data.Enums;

namespace MyApp.Data.Entities;

public class Bank : BaseEntity
{
    public Guid Id { get; set; }
    public int Code { get; set; }
    public string Fullname { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Comment { get; set; }
    public int PinLength { get; set; }
    public BankType BankType { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public ICollection<Expense> Expenses { get; set; }
    public Contact Contact { get; set; }
    public ICollection<Account> Accounts { get; set; }
    public ICollection<Notification> Notifications { get; set; }
}