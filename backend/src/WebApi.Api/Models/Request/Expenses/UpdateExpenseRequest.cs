namespace WebApi.Api.Models.Request.Expenses;

public class UpdateExpenseRequest
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public decimal Amount { get; set; }
}