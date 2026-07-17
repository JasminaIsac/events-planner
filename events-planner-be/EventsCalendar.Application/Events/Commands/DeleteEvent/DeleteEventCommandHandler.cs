
using EventsCalendar.Application.Abstractions.Authorization;
using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Abstractions.Persistence;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Common.Validators;

namespace EventsCalendar.Application.Events.Commands.DeleteEvent
{
    public class DeleteEventCommandHandler : ICommandHandler<DeleteEventCommand>
    {
        private readonly IEventRepository _eventRepository;
        private readonly IEventAuthorizationService _eventAuthorizationService;
        private readonly DeleteEventCommandValidator _validator;

        public DeleteEventCommandHandler(
            IEventRepository eventRepository, 
            IEventAuthorizationService eventAuthorizationService,
            DeleteEventCommandValidator validator)
        {
            _eventRepository = eventRepository;
            _eventAuthorizationService = eventAuthorizationService;
            _validator = validator;
        }

        public async Task<Result> Handle(DeleteEventCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
                return Result.Failure(validationResult.ToError());

            var existingEvent = await _eventRepository.GetByIdAsync(request.Id, cancellationToken);

            if (existingEvent is null)
                return Result.Failure(new Error("Event.NotFound", "Event not found."));

            var permissionResult = _eventAuthorizationService.CanModify(existingEvent);

            if (permissionResult.IsFailure)
                return Result.Failure(permissionResult.Error!);
            
            existingEvent.MarkAsDeleted();
            await _eventRepository.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
