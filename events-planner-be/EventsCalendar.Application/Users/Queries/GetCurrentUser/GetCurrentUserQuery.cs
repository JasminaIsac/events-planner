using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Users.Responses;

namespace EventsCalendar.Application.Users.Queries.GetCurrentUser
{
    public sealed record GetCurrentUserQuery() : IQuery<UserResponse>;
}
