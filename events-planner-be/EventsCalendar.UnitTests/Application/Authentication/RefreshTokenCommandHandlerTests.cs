using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Authentication.Commands.RefreshToken;
using EventsCalendar.Application.Authentication.Responses;
using EventsCalendar.Application.Common.Results;
using FluentAssertions;
using FluentValidation;
using FluentValidation.Results;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Authentication
{
    public class RefreshTokenCommandHandlerTests
    {
        private readonly IRefreshTokenService _refreshTokenService = Substitute.For<IRefreshTokenService>();
        private readonly IValidator<RefreshTokenCommand> _validator = Substitute.For<IValidator<RefreshTokenCommand>>();
        private readonly RefreshTokenCommandHandler _handler;

        public RefreshTokenCommandHandlerTests()
        {
            _handler = new RefreshTokenCommandHandler(
                _refreshTokenService,
                _validator);
        }

        [Fact]
        public async Task Handle_ShouldReturnFailure_WhenValidationFails()
        {
            var command = new RefreshTokenCommand("");

            _validator
                .ValidateAsync(command, Arg.Any<CancellationToken>())
                .Returns(new ValidationResult([
                    new ValidationFailure("RefreshToken", "Refresh token is required.")
                ]));

            var result = await _handler.Handle(command, CancellationToken.None);

            result.IsFailure.Should().BeTrue();

            await _refreshTokenService
                .DidNotReceiveWithAnyArgs()
                .RefreshAsync(default!, default!);
        }

        [Fact]
        public async Task Handle_ShouldRefreshToken_WhenRequestIsValid()
        {
            var command = new RefreshTokenCommand("valid-refresh-token");
            var expectedResponse = new AuthResponse("access-token", "new-refresh-token");

            _validator
                .ValidateAsync(command, Arg.Any<CancellationToken>())
                .Returns(new ValidationResult());

            _refreshTokenService
                .RefreshAsync(command.RefreshToken, Arg.Any<CancellationToken>())
                .Returns(Result<AuthResponse>.Success(expectedResponse));

            var result = await _handler.Handle(command, CancellationToken.None);

            result.IsSuccess.Should().BeTrue();
            result.Value.Should().BeEquivalentTo(expectedResponse);

            await _refreshTokenService
                .Received(1)
                .RefreshAsync(command.RefreshToken, Arg.Any<CancellationToken>());
        }
    }
}