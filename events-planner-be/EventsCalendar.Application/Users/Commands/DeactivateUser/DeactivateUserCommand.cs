using EventsCalendar.Application.Abstractions.Messaging;

namespace EventsCalendar.Application.Users.Commands.DeactivateUser
{
    public sealed record DeactivateUserCommand(Guid Id) : ICommand;
}
