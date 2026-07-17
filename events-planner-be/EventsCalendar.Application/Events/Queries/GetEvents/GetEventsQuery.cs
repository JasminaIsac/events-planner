using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Events.Responses;

namespace EventsCalendar.Application.Events.Queries.GetEvents
{
    public record GetEventsQuery : IQuery<List<EventResponse>>;
}
