using FluentValidation;

namespace EventsCalendar.Application.Events.Commands.UpdateEvent
{
    public class UpdateEventCommandValidator : AbstractValidator<UpdateEventCommand>
    {
        public UpdateEventCommandValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty();

            RuleFor(x => x.Title)
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(x => x.Description)
                .MaximumLength(1000);

            RuleFor(x => x.Category)
                .IsInEnum();

            RuleFor(x => x.StartDateTime)
                .NotEmpty();

            RuleFor(x => x.EndDateTime)
                .NotEmpty()
                .GreaterThan(x => x.StartDateTime);

            RuleFor(x => x.Color)
                .NotEmpty()
                .MaximumLength(20);
        }
    }
}
