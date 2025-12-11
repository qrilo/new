namespace WebApi.Api.Models.Request.Contacts;

public class UpdateContactRequest
{
    public Guid Id { get; set; }
    public string Fullname { get; set; }
    public string Phone { get; set; }
}