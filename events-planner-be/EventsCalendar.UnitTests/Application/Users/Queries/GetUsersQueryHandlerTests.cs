using EventsCalendar.Application.Abstractions.Users;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Users.Queries.GetUsers;
using EventsCalendar.Application.Users.Responses;
using EventsCalendar.Domain.Constants;
using FluentAssertions;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Users.Queries
{
    public class GetUsersQueryHandlerTests
    {
        private readonly IUserService _userService = Substitute.For<IUserService>();

        [Fact]
        public async Task Handle_ShouldReturnUsers()
        {
            var users = new List<UserResponse>
            {
                new(
                    Guid.NewGuid(),
                    "John",
                    "Doe",
                    "john@example.com",
                    "060000006",
                    new List<string> { Roles.Admin },
                    true,
                    DateTime.UtcNow,
                    null)
            };

            _userService
                .GetAllAsync(Arg.Any<CancellationToken>())
                .Returns(Result<List<UserResponse>>.Success(users));

            var handler = new GetUsersQueryHandler(_userService);

            var result = await handler.Handle(
                new GetUsersQuery(),
                CancellationToken.None);

            result.IsSuccess.Should().BeTrue();
            result.Value.Should().HaveCount(1);
            result.Value![0].FirstName.Should().Be("John");
            result.Value![0].LastName.Should().Be("Doe");
        }
    }
}