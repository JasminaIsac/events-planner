using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Abstractions.Persistence;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Common.Validators;
using EventsCalendar.Application.Events.Responses;
using EventsCalendar.Domain.Entities;
using FluentValidation;

namespace EventsCalendar.Application.Events.Commands.CreateEvent
{
    public class CreateEventCommandHandler : ICommandHandler<CreateEventCommand, EventResponse>
    {
        private readonly IEventRepository _eventRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IValidator<CreateEventCommand> _validator;

        public CreateEventCommandHandler(
            IEventRepository eventRepository, 
            ICurrentUserService currentUserService,
            IValidator<CreateEventCommand> validator)
        {
            _eventRepository = eventRepository;
            _currentUserService = currentUserService;
            _validator = validator;
        }

        public async Task<Result<EventResponse>> Handle(CreateEventCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
                return Result<EventResponse>.Failure(validationResult.ToError());

            var userIdResult = _currentUserService.GetUserId();

            if (userIdResult.IsFailure)
                return Result<EventResponse>.Failure(userIdResult.Error!);

            var newEvent = new Event(
                request.Title,
                request.StartDateTime,
                request.EndDateTime,
                userIdResult.Value,
                request.Color,
                request.Category,
                request.Description
            );

            await _eventRepository.AddAsync(newEvent, cancellationToken);
            await _eventRepository.SaveChangesAsync(cancellationToken);

            return Result<EventResponse>.Success(new EventResponse(newEvent));
        }
    }
}
