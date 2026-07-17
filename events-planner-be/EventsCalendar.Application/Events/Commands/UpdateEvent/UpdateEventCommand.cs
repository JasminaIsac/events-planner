using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Events.Responses;
using EventsCalendar.Domain.Enums;

namespace EventsCalendar.Application.Events.Commands.UpdateEvent
{
    public record UpdateEventCommand(
        Guid Id,
        string Title,
        string? Description,
        EventCategory Category,
        DateTime StartDateTime,
        DateTime EndDateTime,
        string Color
    ) : ICommand<EventResponse>;
}
