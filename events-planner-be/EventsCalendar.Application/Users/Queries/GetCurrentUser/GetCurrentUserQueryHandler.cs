using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Abstractions.Users;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Users.Responses;

namespace EventsCalendar.Application.Users.Queries.GetCurrentUser
{
    public class GetCurrentUserQueryHandler : IQueryHandler<GetCurrentUserQuery, UserResponse>
    {
        private readonly IUserService _userService;

        public GetCurrentUserQueryHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<Result<UserResponse>> Handle(GetCurrentUserQuery _, CancellationToken cancellationToken)
        {
            return await _userService.GetCurrentUserAsync(cancellationToken);
        }
    }
}
