using MyApp.Data.Enums;

namespace MyApp.Data.Entities;

public class Transaction : BaseEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public TransactionType TransactionType { get; set; }
    public string Type { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public Guid AccountId { get; set; }
    public Account Account { get; set; }
}