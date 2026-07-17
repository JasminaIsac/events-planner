using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Users.Responses;

namespace EventsCalendar.Application.Users.Queries.GetUserById
{
    public record GetUserByIdQuery(Guid Id) : IQuery<UserResponse>;
}
