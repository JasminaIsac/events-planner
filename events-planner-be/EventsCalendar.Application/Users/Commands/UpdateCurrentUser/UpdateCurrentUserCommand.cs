using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Users.Responses;

namespace EventsCalendar.Application.Users.Commands.UpdateCurrentUser
{
    public sealed record UpdateCurrentUserCommand(
        string FirstName,
        string LastName,
        string Phone) : ICommand<UserResponse>;
}
