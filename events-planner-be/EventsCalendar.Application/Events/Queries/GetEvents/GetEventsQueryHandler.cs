using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Abstractions.Persistence;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Events.Responses;

namespace EventsCalendar.Application.Events.Queries.GetEvents
{
    public class GetEventsQueryHandler : IQueryHandler<GetEventsQuery, List<EventResponse>>
    {
        private readonly IEventRepository _eventRepository;

        public GetEventsQueryHandler(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public async Task<Result<List<EventResponse>>> Handle(GetEventsQuery _, CancellationToken cancellationToken)
        {
            var events = await _eventRepository.GetAllAsync(cancellationToken);

            var response = events.Select(ev => new EventResponse(ev)).ToList();

            return Result<List<EventResponse>>.Success(response);
        }
    }
}
