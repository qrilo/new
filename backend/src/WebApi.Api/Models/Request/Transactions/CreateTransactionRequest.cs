using MyApp.Data.Enums;

namespace WebApi.Api.Models.Request.Transactions;

public class CreateTransactionRequest
{
    public string Name { get; set; }
    public TransactionType TransactionType  { get; set; }
    public string Type { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
}