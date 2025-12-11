using Microsoft.AspNetCore.Authorization;
using MyApp.Data.Enums;

namespace WebApi.Api.Attributes;

public class AuthorizeRole : AuthorizeAttribute
{
    public AuthorizeRole(params UserRole[] roles)
    {
        Roles = string.Join(",", roles.Select(r => r.ToString()));
    }
}