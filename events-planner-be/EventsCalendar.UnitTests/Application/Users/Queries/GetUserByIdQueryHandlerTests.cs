using EventsCalendar.Application.Abstractions.Users;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Users.Queries.GetUserById;
using EventsCalendar.Application.Users.Responses;
using EventsCalendar.Domain.Constants;
using FluentAssertions;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Users.Queries
{
    public class GetUserByIdQueryHandlerTests
    {
        private readonly IUserService _userService = Substitute.For<IUserService>();

        [Fact]
        public async Task Handle_ShouldReturnUser()
        {
            var userId = Guid.NewGuid();

            var userResponse = new UserResponse(
                userId,
                "John",
                "Doe",
                "john@example.com",
                "060000006",
                new List<string> { Roles.Admin },
                true,
                DateTime.UtcNow,
                null);

            _userService.GetByIdAsync(userId, Arg.Any<CancellationToken>())
                .Returns(Result<UserResponse>.Success(userResponse));

            var handler = new GetUserByIdQueryHandler(_userService);

            var result = await handler.Handle(new GetUserByIdQuery(userId), CancellationToken.None);

            result.IsSuccess.Should().BeTrue();
            result.Value.Should().NotBeNull();
            result.Value!.FirstName.Should().Be("John");
            result.Value.LastName.Should().Be("Doe");
        }

        [Fact]
        public async Task Handle_ShouldReturnNotFound_WhenUserDoesNotExist()
        {
            var userId = Guid.NewGuid();

            _userService.GetByIdAsync(userId, Arg.Any<CancellationToken>())
                .Returns(Result<UserResponse>.Failure(new Error("Users.NotFound", "User not found")));

            var handler = new GetUserByIdQueryHandler(_userService);

            var result = await handler.Handle(new GetUserByIdQuery(userId), CancellationToken.None);

            result.IsSuccess.Should().BeFalse();

            result.Error!.Code.Should().Be("Users.NotFound");
            result.Error.Message.Should().Be("User not found");
        }
    }
}
