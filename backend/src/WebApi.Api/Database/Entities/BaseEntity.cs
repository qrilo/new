namespace MyApp.Data.Entities;

public abstract class BaseEntity
{
    public DateTime CreateAtUtc { get; set; }
    public DateTime UpdateAtUtc { get; set; }
}