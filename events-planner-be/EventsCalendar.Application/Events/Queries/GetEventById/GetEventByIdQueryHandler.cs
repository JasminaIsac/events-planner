using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Abstractions.Persistence;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Events.Responses;

namespace EventsCalendar.Application.Events.Queries.GetEventById
{
    public class GetEventByIdQueryHandler : IQueryHandler<GetEventByIdQuery, EventResponse>
    {
        private readonly IEventRepository _eventRepository;

        public GetEventByIdQueryHandler(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public async Task<Result<EventResponse>> Handle(GetEventByIdQuery request, CancellationToken cancellationToken)
        {
            var existingEvent = await _eventRepository.GetByIdAsync(request.Id, cancellationToken);

            if (existingEvent is null)
                return Result<EventResponse>.Failure(
                    new Error("Event.NotFound", "Event not found."));

            return Result<EventResponse>.Success(
                new EventResponse(existingEvent));
        }
    }
}
