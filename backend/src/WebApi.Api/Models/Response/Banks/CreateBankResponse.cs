namespace WebApi.Api.Models.Response.Banks;

public class CreateBankResponse
{
    public Guid Id { get; set; }
    public string Fullname { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Comment { get; set; }
    public int PinLength { get; set; }
    public int Code { get; set; }
}