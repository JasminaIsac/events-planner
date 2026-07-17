using EventsCalendar.Application.Common.Results;

namespace EventsCalendar.Application.Abstractions.Authentication
{
    public interface ICurrentUserService
    {
        Guid? UserId { get; }
        bool IsAuthenticated { get; }

        Result<Guid> GetUserId();

    }
}
