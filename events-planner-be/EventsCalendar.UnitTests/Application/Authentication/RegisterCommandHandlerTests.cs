using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Authentication.Commands.Register;
using EventsCalendar.Application.Authentication.Responses;
using EventsCalendar.Application.Common.Results;
using FluentAssertions;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Authentication
{
    public class RegisterCommandHandlerTests
    {
        private readonly IIdentityService _identityService = Substitute.For<IIdentityService>();

        [Fact]
        public async Task Handle_ShouldReturnAuthResponse_WhenRegisterSucceeds()
        {
            var command = new RegisterCommand(
                "John",
                "Doe",
                "john@example.com",
                "060000006",
                "Password123!");

            var response = new AuthResponse("access-token", "refresh-token");

            _identityService
                .RegisterAsync(
                    command.FirstName,
                    command.LastName,
                    command.Email,
                    command.Phone,
                    command.Password,
                    Arg.Any<CancellationToken>())
                .Returns(Result<AuthResponse>.Success(response));

            var handler = new RegisterCommandHandler(_identityService);

            var result = await handler.Handle(command, CancellationToken.None);

            result.IsSuccess.Should().BeTrue();
            result.Value!.RefreshToken.Should().Be("refresh-token");

            await _identityService
                .Received(1)
                .RegisterAsync(
                    command.FirstName,
                    command.LastName,
                    command.Email,
                    command.Phone,
                    command.Password,
                    Arg.Any<CancellationToken>());
        }
    }
}
