using FluentValidation;

namespace EventsCalendar.Application.Events.Commands.CreateEvent
{
    public class CreateEventCommandValidator : AbstractValidator<CreateEventCommand>
    {
        public CreateEventCommandValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(x => x.Description)
                .MaximumLength(1000);

            RuleFor(x => x.Category)
                .IsInEnum();

            RuleFor(x => x.StartDateTime)
                .NotEmpty()
                .GreaterThan(DateTime.UtcNow);

            RuleFor(x => x.EndDateTime)
                .NotEmpty()
                .GreaterThan(x => x.StartDateTime);

            RuleFor(x => x.Color)
                .NotEmpty()
                .MaximumLength(20);
        }
    }
}
