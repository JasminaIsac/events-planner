using EventsCalendar.Application.Common.Results;
using Flowify.Contracts;

namespace EventsCalendar.Application.Abstractions.Messaging
{
    public interface IQuery<TResponse> : IRequest<Result<TResponse>>;
}
