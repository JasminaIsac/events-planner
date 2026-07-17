using EventsCalendar.Application.Abstractions.Users;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Users.Commands.UpdateCurrentUser;
using EventsCalendar.Application.Users.Responses;
using EventsCalendar.Domain.Constants;
using FluentAssertions;
using FluentValidation;
using FluentValidation.Results;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Users.Commands
{
    public class UpdateCurrentUserCommandHandlerTests
    {
        private readonly IUserService _userService =
            Substitute.For<IUserService>();

        private readonly IValidator<UpdateCurrentUserCommand> _validator =
            Substitute.For<IValidator<UpdateCurrentUserCommand>>();

        private readonly UpdateCurrentUserCommandHandler _handler;

        public UpdateCurrentUserCommandHandlerTests()
        {
            _handler = new UpdateCurrentUserCommandHandler(
                _userService,
                _validator);
        }

        [Fact]
        public async Task Handle_ShouldReturnFailure_WhenValidationFails()
        {
            var command = CreateCommand();

            _validator
                .ValidateAsync(command, Arg.Any<CancellationToken>())
                .Returns(new ValidationResult([
                    new ValidationFailure("FirstName", "First name is required.")
                ]));

            var result = await _handler.Handle(command, CancellationToken.None);

            result.IsFailure.Should().BeTrue();

            await _userService
                .DidNotReceive()
                .UpdateCurrentUserAsync(
                    Arg.Any<string>(),
                    Arg.Any<string>(),
                    Arg.Any<string>(),
                    Arg.Any<CancellationToken>());
        }

        [Fact]
        public async Task Handle_ShouldUpdateCurrentUser_WhenRequestIsValid()
        {
            var command = CreateCommand();

            var userResponse = new UserResponse(
                Guid.NewGuid(),
                command.FirstName,
                command.LastName,
                "john@example.com",
                command.Phone,
                new List<string> { Roles.Organizer },
                true,
                DateTime.UtcNow,
                null);

            _validator
                .ValidateAsync(command, Arg.Any<CancellationToken>())
                .Returns(new ValidationResult());

            _userService
                .UpdateCurrentUserAsync(
                    command.FirstName,
                    command.LastName,
                    command.Phone,
                    Arg.Any<CancellationToken>())
                .Returns(Result<UserResponse>.Success(userResponse));

            var result = await _handler.Handle(command, CancellationToken.None);

            result.IsSuccess.Should().BeTrue();
            result.Value.Should().NotBeNull();
            result.Value!.FirstName.Should().Be(command.FirstName);
            result.Value.LastName.Should().Be(command.LastName);
            result.Value.Phone.Should().Be(command.Phone);

            await _userService
                .Received(1)
                .UpdateCurrentUserAsync(
                    command.FirstName,
                    command.LastName,
                    command.Phone,
                    Arg.Any<CancellationToken>());
        }

        private static UpdateCurrentUserCommand CreateCommand()
        {
            return new UpdateCurrentUserCommand(
                "John",
                "Doe",
                "060000006");
        }
    }
}