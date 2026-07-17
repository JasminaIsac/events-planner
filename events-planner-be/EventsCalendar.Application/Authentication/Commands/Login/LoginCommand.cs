using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Authentication.Responses;

namespace EventsCalendar.Application.Authentication.Commands.Login
{
    public sealed record LoginCommand(string Email, string Password) : ICommand<AuthResponse>;
}
