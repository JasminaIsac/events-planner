using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Users.Responses;

namespace EventsCalendar.Application.Users.Queries.GetUsers
{
    public record GetUsersQuery : IQuery<List<UserResponse>>;
}
