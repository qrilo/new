namespace MyApp.Data.Entities;

public class Expense : BaseEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public decimal Amount { get; set; }
    public Guid? AccountId { get; set; }
    public Account? Account { get; set; }
}