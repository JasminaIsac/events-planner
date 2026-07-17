using EventsCalendar.Application.Abstractions.Messaging;

namespace EventsCalendar.Application.Users.Commands.ChangePassword
    {
        public sealed record ChangePasswordCommand(
            string CurrentPassword,
            string NewPassword
        ) : ICommand;
    }