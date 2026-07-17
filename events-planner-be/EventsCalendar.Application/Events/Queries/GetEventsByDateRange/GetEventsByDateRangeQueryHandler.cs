using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Abstractions.Persistence;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Events.Responses;

namespace EventsCalendar.Application.Events.Queries.GetEventsByDateRange
{
    public class GetEventsByDateRangeQueryHandler : IQueryHandler<GetEventsByDateRangeQuery, List<EventResponse>>
    {
        private readonly IEventRepository _eventRepository;

        public GetEventsByDateRangeQueryHandler(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public async Task<Result<List<EventResponse>>> Handle(GetEventsByDateRangeQuery request, CancellationToken cancellationToken)
        {
            var events = await _eventRepository.GetByDateRange(request.StartDate, request.EndDate, cancellationToken);

            var response = events.Select(ev => new EventResponse(ev)).ToList();

            return Result<List<EventResponse>>.Success(response);
        }
    }
}
