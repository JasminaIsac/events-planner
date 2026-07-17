using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Abstractions.Users;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Users.Responses;

namespace EventsCalendar.Application.Users.Queries.GetUsers
{
    public class GetUsersQueryHandler : IQueryHandler<GetUsersQuery, List<UserResponse>>
    {
        private readonly IUserService _userService;

        public GetUsersQueryHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<Result<List<UserResponse>>> Handle(
            GetUsersQuery _, 
            CancellationToken cancellationToken)
        {
            return await _userService.GetAllAsync(cancellationToken);
        }
    }
}
