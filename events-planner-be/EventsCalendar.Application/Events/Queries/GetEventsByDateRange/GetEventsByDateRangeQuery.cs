using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Events.Responses;

namespace EventsCalendar.Application.Events.Queries.GetEventsByDateRange
{
    public record GetEventsByDateRangeQuery(DateTime StartDate, DateTime EndDate) : IQuery<List<EventResponse>>;
}
