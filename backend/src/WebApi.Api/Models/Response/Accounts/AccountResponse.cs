using WebApi.Api.Models.Response.Expenses;
using WebApi.Api.Models.Response.Transactions;

namespace WebApi.Api.Models.Response.Accounts;

public class AccountResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public decimal Balance { get; set; }
    public string Hash { get; set; }
    public bool ShowNewPayment { get; set; }
    public ICollection<TransactionResponse>? Transactions { get; set; }
    public ICollection<ExpenseResponse>? Expenses { get; set; }
}