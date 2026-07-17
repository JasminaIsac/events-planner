using EventsCalendar.Application.Abstractions.Users;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Users.Queries.GetCurrentUser;
using EventsCalendar.Application.Users.Responses;
using EventsCalendar.Domain.Constants;
using FluentAssertions;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Users.Queries
{
    public class GetCurrentUserQueryHandlerTests
    {
        private readonly IUserService _userService = Substitute.For<IUserService>();

        [Fact]
        public async Task Handle_ShouldReturnCurrentUser()
        {
            var userResponse = new UserResponse
            (
                new Guid(),
                "John",
                "Doe",
                "john@example.com",
                "060000006",
                new List<string> { Roles.Admin },
                true,
                DateTime.UtcNow,
                null);

            _userService.GetCurrentUserAsync(Arg.Any<CancellationToken>())
                .Returns(Result<UserResponse>.Success(userResponse));

            var handler = new GetCurrentUserQueryHandler(_userService);

            var result = await handler.Handle(new GetCurrentUserQuery(), CancellationToken.None);

            result.IsSuccess.Should().BeTrue();
            result.Value.Should().NotBeNull();
            result.Value!.FirstName.Should().Be("John");
            result.Value.LastName.Should().Be("Doe");
        }
    }
}
