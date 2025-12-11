namespace WebApi.Api.Models.Response.Expenses;

public class ExpenseResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public decimal Amount { get; set; }
}