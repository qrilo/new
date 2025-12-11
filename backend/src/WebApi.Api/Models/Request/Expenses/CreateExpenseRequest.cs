namespace WebApi.Api.Models.Request.Expenses;

public class CreateExpenseRequest
{
    public string Name { get; set; }
    public decimal Amount { get; set; }
}