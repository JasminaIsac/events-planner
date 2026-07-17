using EventsCalendar.Application.Abstractions.Messaging;

namespace EventsCalendar.Application.Events.Commands.DeleteEvent
{
    public record DeleteEventCommand(Guid Id) : ICommand;
}
