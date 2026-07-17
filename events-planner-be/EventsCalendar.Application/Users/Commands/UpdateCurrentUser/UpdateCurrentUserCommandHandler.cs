using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Abstractions.Users;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Common.Validators;
using EventsCalendar.Application.Users.Responses;
using FluentValidation;

namespace EventsCalendar.Application.Users.Commands.UpdateCurrentUser
{
    public class UpdateCurrentUserCommandHandler
    : ICommandHandler<UpdateCurrentUserCommand, UserResponse>
    {
        private readonly IUserService _userService;
        private readonly IValidator<UpdateCurrentUserCommand> _validator;

        public UpdateCurrentUserCommandHandler(
            IUserService userService,
            IValidator<UpdateCurrentUserCommand> validator)
        {
            _userService = userService;
            _validator = validator;
        }

        public async Task<Result<UserResponse>> Handle(
            UpdateCurrentUserCommand request,
            CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(
                request,
                cancellationToken);

            if (!validationResult.IsValid)
            {
                return Result<UserResponse>.Failure(validationResult.ToError());
            }

            return await _userService.UpdateCurrentUserAsync(
                request.FirstName,
                request.LastName,
                request.Phone,
                cancellationToken);
        }
    }
}
