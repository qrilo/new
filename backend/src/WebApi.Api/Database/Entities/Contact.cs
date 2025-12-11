namespace MyApp.Data.Entities;

public class Contact : BaseEntity
{
    public Guid Id { get; set; }
    public string Fullname { get; set; }
    public string Phone { get; set; }
    public Guid BankId { get; set; }
}