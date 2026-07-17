using EventsCalendar.Application.Abstractions.Authorization;
using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Abstractions.Persistence;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Common.Validators;
using EventsCalendar.Application.Events.Responses;
using FluentValidation;

namespace EventsCalendar.Application.Events.Commands.UpdateEvent
{
    public class UpdateEventCommandHandler : ICommandHandler<UpdateEventCommand, EventResponse>
    {
        private readonly IEventRepository _eventRepository;
        private readonly IEventAuthorizationService _eventAuthorizationService;
        private readonly IValidator<UpdateEventCommand> _validator;

        public UpdateEventCommandHandler(
            IEventRepository eventRepository, 
            IEventAuthorizationService eventAuthorizationService,
            IValidator<UpdateEventCommand> validator)
        {
            _eventRepository = eventRepository;
            _eventAuthorizationService = eventAuthorizationService;
            _validator = validator;
        }

        public async Task<Result<EventResponse>> Handle(UpdateEventCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);

            if(!validationResult.IsValid)
                return Result<EventResponse>.Failure(validationResult.ToError());
            
            var existingEvent = await _eventRepository.GetByIdAsync(request.Id, cancellationToken);

            if (existingEvent is null)
                return Result<EventResponse>.Failure(new Error("Event.NotFound", "Event not found."));

            var permissionResult = _eventAuthorizationService.CanModify(existingEvent);

            if (permissionResult.IsFailure)
                return Result<EventResponse>.Failure(permissionResult.Error!);
           
            existingEvent.UpdateDetails(
                request.Title,
                request.StartDateTime,
                request.EndDateTime,
                request.Color,
                request.Category,
                request.Description);

            await _eventRepository.SaveChangesAsync(cancellationToken);

            return Result<EventResponse>.Success(new EventResponse(existingEvent));
        }
    }
}
