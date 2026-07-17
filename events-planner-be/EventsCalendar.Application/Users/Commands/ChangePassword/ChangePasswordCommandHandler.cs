using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Abstractions.Users;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Common.Validators;
using FluentValidation;

namespace EventsCalendar.Application.Users.Commands.ChangePassword
{
    public class ChangePasswordCommandHandler : ICommandHandler<ChangePasswordCommand>
    {
        private readonly IUserService _userService;
        private readonly IValidator<ChangePasswordCommand> _validator;

        public ChangePasswordCommandHandler(
            IUserService userService,
            IValidator<ChangePasswordCommand> validator)
        {
            _userService = userService;
            _validator = validator;
        }

        public async Task<Result> Handle(
            ChangePasswordCommand request,
            CancellationToken cancellationToken)

        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
                return Result.Failure(validationResult.ToError());

            return await _userService.ChangePasswordAsync(
                request.CurrentPassword,
                request.NewPassword,
                cancellationToken);
        }
    }
}
