using EventsCalendar.Application.Common.Results;
using Flowify.Contracts;

namespace EventsCalendar.Application.Abstractions.Messaging
{
    public interface ICommandHandler<TCommand> 
        : IRequestHandler<TCommand, Result> 
        where TCommand : ICommand;

    public interface ICommandHandler<TCommand, TResponse>
        : IRequestHandler<TCommand, Result<TResponse>>
        where TCommand : ICommand<TResponse>;
}