using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Abstractions.Users;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Common.Validators;
using FluentValidation;

namespace EventsCalendar.Application.Users.Commands.DeactivateUser
{
    public class DeactivateUserCommandHandler : ICommandHandler<DeactivateUserCommand>
    {
        private readonly IUserService _userService;
        private readonly IValidator<DeactivateUserCommand> _validator;

        public DeactivateUserCommandHandler(
            IUserService userService,
            IValidator<DeactivateUserCommand> validator)
        {
            _userService = userService;
            _validator = validator;
        }

        public async Task<Result> Handle(
            DeactivateUserCommand request,
            CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(
                request,
                cancellationToken);

            if (!validationResult.IsValid)
                return Result.Failure(validationResult.ToError());
            
            return await _userService.DeactivateAsync(
                request.Id,
                cancellationToken);
        }
    }
}
