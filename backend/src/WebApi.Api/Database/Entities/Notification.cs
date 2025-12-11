namespace MyApp.Data.Entities;

public class Notification : BaseEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public Guid BankId { get; set; }
    public Bank Bank { get; set; }
}