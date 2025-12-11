namespace MyApp.Data.Entities;

public class Account : BaseEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public decimal Balance { get; set; }
    public string Hash { get; set; }
    public bool ShowNewPayment { get; set; }
    public ICollection<Transaction> Transactions { get; set; }
    public Guid BankId { get; set; }
    public Bank Bank { get; set; }
    public ICollection<Expense>? Expenses { get; set; }
}