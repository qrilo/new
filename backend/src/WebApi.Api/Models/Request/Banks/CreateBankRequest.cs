using MyApp.Data.Enums;
using WebApi.Api.Models.Request.Contacts;
using WebApi.Api.Models.Request.Expenses;

namespace WebApi.Api.Models.Request.Banks;

public class CreateBankRequest
{
    public string Fullname { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Comment { get; set; }
    public int PinLength { get; set; }
    public BankType BankType { get; set; }
    public ICollection<CreateExpenseRequest> Expenses { get; set; }
    public CreateContactRequest Contact { get; set; }
}