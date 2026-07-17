using FluentValidation;

namespace EventsCalendar.Application.Authentication.Commands.RefreshToken
{
    public class RefreshTokenValidator : AbstractValidator<RefreshTokenCommand>
    {
        public RefreshTokenValidator()
        {
            RuleFor(x => x.RefreshToken)
                .NotEmpty()
                .MaximumLength(400);
        }
    }
}
