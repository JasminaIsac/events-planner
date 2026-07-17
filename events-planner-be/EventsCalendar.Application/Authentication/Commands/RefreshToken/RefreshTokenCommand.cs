using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Authentication.Responses;

namespace EventsCalendar.Application.Authentication.Commands.RefreshToken
{
    public sealed record RefreshTokenCommand(string RefreshToken) : ICommand<AuthResponse>;
}
