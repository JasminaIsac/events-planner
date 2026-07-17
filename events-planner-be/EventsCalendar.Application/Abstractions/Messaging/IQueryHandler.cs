using EventsCalendar.Application.Common.Results;
using Flowify.Contracts;

namespace EventsCalendar.Application.Abstractions.Messaging
{
    public interface IQueryHandler<TQuery, TResponse>
        : IRequestHandler<TQuery, Result<TResponse>>
        where TQuery : IQuery<TResponse>;
}
