using WebApi.Api.Models.Request.Contacts;
using WebApi.Api.Models.Request.Expenses;

namespace WebApi.Api.Models.Request.Banks;

public class UpdateBankRequest
{
    public string Fullname { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Comment { get; set; }
    public int PinLength { get; set; }
    public ICollection<UpdateExpenseRequest> Expenses { get; set; }
    public UpdateContactRequest Contact { get; set; }
}