using MyApp.Data.Enums;

namespace WebApi.Api.Models.Response.Transactions;

public class TransactionResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public TransactionType TransactionType { get; set; }
    public string Type { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
}