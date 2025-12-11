using MyApp.Data.Enums;

namespace MyApp.Data.Entities;

public class ChatMessage : BaseEntity
{
    public Guid Id { get; set; }
    public string Message { get; set; }

    public Guid ManagerId { get; set; }
    public User Manager { get; set; }

    public Guid ClientId { get; set; }
    public Bank Client { get; set; }

    public SenderRole SenderRole { get; set; }
}