using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Authentication.Commands.Login;
using EventsCalendar.Application.Authentication.Responses;
using EventsCalendar.Application.Common.Results;
using FluentAssertions;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Authentication
{
    public class LoginCommandHandlerTests
    {
        private readonly IIdentityService _identityService = Substitute.For<IIdentityService>();

        [Fact]
        public async Task Handle_ShouldReturnAuthResponse_WhenLoginSucceeds()
        {
            var command = new LoginCommand("john@example.com", "Password123!");
            var response = new AuthResponse("access-token", "refresh-token");

            _identityService
                .LoginAsync(command.Email, command.Password, Arg.Any<CancellationToken>())
                .Returns(Result<AuthResponse>.Success(response));

            var handler = new LoginCommandHandler(_identityService);

            var result = await handler.Handle(command, CancellationToken.None);

            result.IsSuccess.Should().BeTrue();
            result.Value!.AccessToken.Should().Be("access-token");

            await _identityService
                .Received(1)
                .LoginAsync(command.Email, command.Password, Arg.Any<CancellationToken>());
        }
    }
}
