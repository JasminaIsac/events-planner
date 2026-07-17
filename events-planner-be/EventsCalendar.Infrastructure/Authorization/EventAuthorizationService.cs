using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Abstractions.Authorization;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Domain.Entities;

namespace EventsCalendar.Infrastructure.Authorization
{
    public class EventAuthorizationService : IEventAuthorizationService
    {
        private readonly ICurrentUserService _currentUserService;

        public EventAuthorizationService(
            ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;
        }

        public Result CanModify(Event existingEvent)
        {
            var userIdResult = _currentUserService.GetUserId();

            if (userIdResult.IsFailure)
                return Result.Failure(userIdResult.Error!);
            

            if (existingEvent.OrganizerId != userIdResult.Value)
            {
                return Result.Failure(
                    new Error("Auth.Forbidden", "You are not allowed to modify this event."));
            }

            return Result.Success();
        }
    }
}
