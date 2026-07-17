using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Common.Results;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace EventsCalendar.Infrastructure.Authentication
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public bool IsAuthenticated =>
            _httpContextAccessor.HttpContext?.User.Identity?.IsAuthenticated == true;

        public Guid? UserId
        {
            get
            {
                if (!IsAuthenticated)
                    return null;
               
                var userId = _httpContextAccessor
                    .HttpContext?
                    .User
                    .FindFirstValue(ClaimTypes.NameIdentifier);

                return Guid.Parse(userId!);
            }
        }

        public Result<Guid> GetUserId()
        {
            if (!IsAuthenticated || UserId is null)
            {
                return Result<Guid>.Failure(
                    new Error("Auth.Unauthorized", "User is not authenticated."));
            }

            return Result<Guid>.Success(UserId.Value);
        }
    }
}
