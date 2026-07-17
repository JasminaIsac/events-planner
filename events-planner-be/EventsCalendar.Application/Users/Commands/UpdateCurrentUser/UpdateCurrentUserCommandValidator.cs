using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace EventsCalendar.Application.Users.Commands.UpdateCurrentUser
{
    public class UpdateCurrentUserCommandValidator
     : AbstractValidator<UpdateCurrentUserCommand>
    {
        public UpdateCurrentUserCommandValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(x => x.LastName)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(x => x.Phone)
                .NotEmpty()
                .Matches(@"^\+?[1-9]\d{1,14}$")
                .WithMessage("Phone number must be in E.164 format.");
        }
    }
}
