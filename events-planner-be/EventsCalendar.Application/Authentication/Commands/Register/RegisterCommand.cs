using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Authentication.Responses;

namespace EventsCalendar.Application.Authentication.Commands.Register
{
    public sealed record RegisterCommand(
        string FirstName,
        string LastName,
        string Email,
        string Phone,
        string Password
    ) : ICommand<AuthResponse>;
}
