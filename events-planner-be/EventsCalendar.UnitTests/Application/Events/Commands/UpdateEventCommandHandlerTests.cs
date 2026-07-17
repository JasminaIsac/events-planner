using EventsCalendar.Application.Abstractions.Authorization;
using EventsCalendar.Application.Abstractions.Persistence;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Events.Commands.UpdateEvent;
using EventsCalendar.Domain.Entities;
using EventsCalendar.Domain.Enums;
using FluentAssertions;
using FluentValidation;
using FluentValidation.Results;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Events.Commands
{
    public class UpdateEventCommandHandlerTests
    {
        private readonly IEventRepository _eventRepository = Substitute.For<IEventRepository>();
        private readonly IEventAuthorizationService _eventAuthorizationService =
            Substitute.For<IEventAuthorizationService>();

        private readonly IValidator<UpdateEventCommand> _validator =
            Substitute.For<IValidator<UpdateEventCommand>>();

        private readonly UpdateEventCommandHandler _handler;

        public UpdateEventCommandHandlerTests()
        {
            _handler = new UpdateEventCommandHandler(
                _eventRepository,
                _eventAuthorizationService,
                _validator);
        }

        [Fact]
        public async Task Handle_ShouldReturnFailure_WhenValidationFails()
        {
            var command = CreateCommand();

            _validator
                .ValidateAsync(command, Arg.Any<CancellationToken>())
                .Returns(new ValidationResult(new[]
                {
                new ValidationFailure("Title", "Title is required.")
                }));

            var result = await _handler.Handle(command, CancellationToken.None);

            result.IsFailure.Should().BeTrue();

            await _eventRepository
                .DidNotReceive()
                .GetByIdAsync(Arg.Any<Guid>(), Arg.Any<CancellationToken>());
        }

        [Fact]
        public async Task Handle_ShouldReturnFailure_WhenEventDoesNotExist()
        {
            var command = CreateCommand();

            _validator
                .ValidateAsync(command, Arg.Any<CancellationToken>())
                .Returns(new ValidationResult());

            _eventRepository
                .GetByIdAsync(command.Id, Arg.Any<CancellationToken>())
                .Returns((Event?)null);

            var result = await _handler.Handle(command, CancellationToken.None);

            result.IsFailure.Should().BeTrue();
            result.Error!.Code.Should().Be("Event.NotFound");

            await _eventRepository
                .DidNotReceive()
                .SaveChangesAsync(Arg.Any<CancellationToken>());
        }

        [Fact]
        public async Task Handle_ShouldReturnFailure_WhenUserHasNoPermission()
        {
            var command = CreateCommand();
            var existingEvent = CreateEvent();

            _validator
                .ValidateAsync(command, Arg.Any<CancellationToken>())
                .Returns(new ValidationResult());

            _eventRepository
                .GetByIdAsync(command.Id, Arg.Any<CancellationToken>())
                .Returns(existingEvent);

            _eventAuthorizationService
                .CanModify(existingEvent)
                .Returns(Result.Failure(
                    new Error("Event.Forbidden", "You cannot modify this event.")));

            var result = await _handler.Handle(command, CancellationToken.None);

            result.IsFailure.Should().BeTrue();
            result.Error!.Code.Should().Be("Event.Forbidden");

            await _eventRepository
                .DidNotReceive()
                .SaveChangesAsync(Arg.Any<CancellationToken>());
        }

        [Fact]
        public async Task Handle_ShouldUpdateEvent_WhenRequestIsValid()
        {
            var command = CreateCommand();
            var existingEvent = CreateEvent();

            _validator
                .ValidateAsync(command, Arg.Any<CancellationToken>())
                .Returns(new ValidationResult());

            _eventRepository
                .GetByIdAsync(command.Id, Arg.Any<CancellationToken>())
                .Returns(existingEvent);

            _eventAuthorizationService
                .CanModify(existingEvent)
                .Returns(Result.Success());

            var result = await _handler.Handle(command, CancellationToken.None);

            result.IsSuccess.Should().BeTrue();
            result.Value!.Title.Should().Be(command.Title);
            result.Value.Color.Should().Be(command.Color);
            result.Value.Category.Should().Be(command.Category);

            await _eventRepository
                .Received(1)
                .SaveChangesAsync(Arg.Any<CancellationToken>());
        }

        private static UpdateEventCommand CreateCommand()
        {
            return new UpdateEventCommand(
                Guid.NewGuid(),
                "Updated title",
                "Updated description",
                EventCategory.Online,
                DateTime.UtcNow.AddHours(2),
                DateTime.UtcNow.AddHours(3),
                "#22C55E");
        }

        private static Event CreateEvent()
        {
            return new Event(
                "Old title",
                DateTime.UtcNow.AddHours(1),
                DateTime.UtcNow.AddHours(2),
                Guid.NewGuid(),
                "#3B82F6",
                EventCategory.Offline,
                "Old description");
        }
    }
}