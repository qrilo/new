using System.Security.Claims;
using MyApp.Data.Enums;
using WebApi.Api.Interfaces;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;

        var bankId = _httpContextAccessor.HttpContext?.User?.FindFirst("bankId")?.Value;
        if (!string.IsNullOrEmpty(bankId) && Guid.TryParse(bankId, out var bankGuid))
        {
            BankId = bankGuid;
            isBankExists = true;
        }
        else
        {
            BankId = Guid.Empty;
            isBankExists = false;
        }
    }

    public Guid UserId
    {
        get
        {
            var idClaim = _httpContextAccessor.HttpContext?.User?.FindFirst("id")?.Value;

            if (isBankExists)
            {
                return Guid.Empty; 
            }

            if (string.IsNullOrEmpty(idClaim) || !Guid.TryParse(idClaim, out var guid))
            {
                throw new UnauthorizedAccessException("User ID claim is missing or invalid");
            }

            return guid;
        }
    }

    public UserRole Role
    {
        get
        {
            var roleClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Role)?.Value;
            if (string.IsNullOrEmpty(roleClaim) || !Enum.TryParse<UserRole>(roleClaim, ignoreCase: true, out var role))
            {
                throw new UnauthorizedAccessException("User role claim is missing or invalid");
            }
            return role;
        }
    }

    public Guid BankId { get; }
    public bool isBankExists { get; }
}