
using EventsCalendar.Application.Abstractions.Users;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Users.Commands.DeactivateUser;
using FluentAssertions;
using FluentValidation;
using FluentValidation.Results;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Users.Commands
{
    public class DeactivateUserCommandHandlerTests
    {
        private readonly IUserService _userService = Substitute.For<IUserService>();
        private readonly IValidator<DeactivateUserCommand> _validator = Substitute.For<IValidator<DeactivateUserCommand>>();
        private readonly DeactivateUserCommandHandler _handler;

        public DeactivateUserCommandHandlerTests()
        {
            _handler = new DeactivateUserCommandHandler(
                _userService,
                _validator);
        }

        [Fact]
        public async Task Handle_ShouldReturnFailure_WhenValidationFails()
        {
            var command = new DeactivateUserCommand(Guid.Empty);

            _validator
                .ValidateAsync(command, Arg.Any<CancellationToken>())
                .Returns(new ValidationResult([
                    new ValidationFailure("Id", "Id is required.")
                ]));

            var result = await _handler.Handle(command, CancellationToken.None);

            result.IsFailure.Should().BeTrue();

            await _userService
                .DidNotReceive()
                .DeactivateAsync(
                    Arg.Any<Guid>(),
                    Arg.Any<CancellationToken>());
        }

        [Fact]
        public async Task Handle_ShouldDeactivateUser_WhenRequestIsValid()
        {
            var command = new DeactivateUserCommand(Guid.NewGuid());

            _validator
                .ValidateAsync(command, Arg.Any<CancellationToken>())
                .Returns(new ValidationResult());

            _userService
                .DeactivateAsync(command.Id, Arg.Any<CancellationToken>())
                .Returns(Result.Success());

            var result = await _handler.Handle(command, CancellationToken.None);

            result.IsSuccess.Should().BeTrue();

            await _userService
            .Received(1)
            .DeactivateAsync(
                command.Id,
                Arg.Any<CancellationToken>());
        }
    }
}
