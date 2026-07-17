using EventsCalendar.Application.Common.Results;
using EventsCalendar.Domain.Entities;

namespace EventsCalendar.Application.Abstractions.Authorization
{
    public interface IEventAuthorizationService
    {
        Result CanModify(Event existingEvent);
    }
}
