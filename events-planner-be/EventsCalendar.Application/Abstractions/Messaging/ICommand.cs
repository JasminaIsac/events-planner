using EventsCalendar.Application.Common.Results;
using Flowify.Contracts;

namespace EventsCalendar.Application.Abstractions.Messaging
{
    public interface ICommand : IRequest<Result>;

    public interface ICommand<TResponse> : IRequest<Result<TResponse>>;
}

