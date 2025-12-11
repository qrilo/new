using WebApi.Api.Models.Request.Expenses;

namespace WebApi.Api.Models.Request.Accounts;

public class CreateAccountRequest
{
    public string Name { get; set; }
    public decimal Balance { get; set; }
    public string Hash { get; set; }
    public bool ShowNewPayment { get; set; }
    public ICollection<CreateExpenseRequest>? Expenses { get; set; }
}