using EventsCalendar.Application.Abstractions.Users;
using EventsCalendar.Application.Users.Commands.ChangePassword;
using FluentAssertions;
using FluentValidation;
using FluentValidation.Results;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Users.Commands
{
    public class ChangePasswordCommandHandlerTests
    {
        private readonly IUserService _userService = Substitute.For<IUserService>();
        private readonly IValidator<ChangePasswordCommand> _validator = Substitute.For<IValidator<ChangePasswordCommand>>();
        private readonly ChangePasswordCommandHandler _handler;

        public ChangePasswordCommandHandlerTests()
        {
            _handler = new ChangePasswordCommandHandler(
                _userService,
                _validator);
        }

        [Fact]
        public async Task Handle_ShouldReturnFailure_WhenValidationFails()
        {
            var command = new ChangePasswordCommand(
                "oldPassword",
                "newPassword");

            _validator
                .ValidateAsync(command, Arg.Any<CancellationToken>())
                .Returns(new ValidationResult(new[]
                {
                new ValidationFailure(
                    "NewPassword",
                    "Password is too weak.")
                }));

            var result = await _handler.Handle(
                command,
                CancellationToken.None);

            result.IsFailure.Should().BeTrue();

            await _userService
                .DidNotReceive()
                .ChangePasswordAsync(
                    Arg.Any<string>(),
                    Arg.Any<string>(),
                    Arg.Any<CancellationToken>());
        }

    }
}
