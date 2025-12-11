using WebApi.Api.Exceptions;

namespace WebApi.Api.Middleware;

public class ApiExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ApiExceptionMiddleware> _logger;

    public ApiExceptionMiddleware(RequestDelegate next, ILogger<ApiExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        int statusCode;
        object response;

        switch (exception)
        {
            case NotFoundException nf:
                statusCode = StatusCodes.Status404NotFound;
                response = new { error = nf.Message };
                break;

            case ForbiddenException fb:
                statusCode = StatusCodes.Status403Forbidden;
                response = new { error = fb.Message };
                break;

            case ValidationException ve:
                statusCode = StatusCodes.Status400BadRequest;
                response = new
                {
                    error = ve.Message,
                    errors = ve.Errors
                };
                break;

            default:
                statusCode = StatusCodes.Status500InternalServerError;
                response = new { error = "Internal Server Error" };
                break;
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = statusCode;

        return context.Response.WriteAsJsonAsync(response);
    }
}
