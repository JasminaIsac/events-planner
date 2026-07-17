using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Events.Responses;

namespace EventsCalendar.Application.Events.Queries.GetEventById
{
    public record GetEventByIdQuery(Guid Id) : IQuery<EventResponse>;
}
