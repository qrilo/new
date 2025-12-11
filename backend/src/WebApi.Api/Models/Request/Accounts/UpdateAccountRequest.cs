using WebApi.Api.Models.Request.Expenses;

namespace WebApi.Api.Models.Request.Accounts;

public class UpdateAccountRequest
{
    public string Name { get; set; }
    public decimal Balance { get; set; }
    public string Hash { get; set; }
    public bool ShowNewPayment { get; set; }
    public ICollection<UpdateExpenseRequest> Expenses { get; set; }

}