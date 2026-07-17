using EventsCalendar.Application.Abstractions.Authorization;
using EventsCalendar.Application.Abstractions.Persistence;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Events.Commands.DeleteEvent;
using EventsCalendar.Domain.Entities;
using EventsCalendar.Domain.Enums;
using FluentAssertions;
using FluentValidation.Results;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Events.Commands;

public class DeleteEventCommandHandlerTests
{
    private readonly IEventRepository _eventRepository =
        Substitute.For<IEventRepository>();

    private readonly IEventAuthorizationService _eventAuthorizationService =
        Substitute.For<IEventAuthorizationService>();

    private readonly DeleteEventCommandValidator _validator = new();

    private readonly DeleteEventCommandHandler _handler;

    public DeleteEventCommandHandlerTests()
    {
        _handler = new DeleteEventCommandHandler(
            _eventRepository,
            _eventAuthorizationService,
            _validator);
    }

    [Fact]
    public async Task Handle_ShouldReturnFailure_WhenValidationFails()
    {
        var command = new DeleteEventCommand(Guid.Empty);

        var result = await _handler.Handle(command, CancellationToken.None);

        result.IsFailure.Should().BeTrue();

        await _eventRepository
            .DidNotReceive()
            .GetByIdAsync(Arg.Any<Guid>(), Arg.Any<CancellationToken>());

        await _eventRepository
            .DidNotReceive()
            .SaveChangesAsync(Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Handle_ShouldReturnFailure_WhenEventDoesNotExist()
    {
        var command = new DeleteEventCommand(Guid.NewGuid());

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
        var command = new DeleteEventCommand(Guid.NewGuid());
        var existingEvent = CreateEvent();

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
    public async Task Handle_ShouldMarkEventAsDeleted_WhenRequestIsValid()
    {
        var command = new DeleteEventCommand(Guid.NewGuid());
        var existingEvent = CreateEvent();

        _eventRepository
            .GetByIdAsync(command.Id, Arg.Any<CancellationToken>())
            .Returns(existingEvent);

        _eventAuthorizationService
            .CanModify(existingEvent)
            .Returns(Result.Success());

        var result = await _handler.Handle(command, CancellationToken.None);

        result.IsSuccess.Should().BeTrue();
        existingEvent.IsDeleted.Should().BeTrue();

        await _eventRepository
            .Received(1)
            .SaveChangesAsync(Arg.Any<CancellationToken>());
    }

    private static Event CreateEvent()
    {
        return new Event(
            "Team Meeting",
            DateTime.UtcNow.AddHours(1),
            DateTime.UtcNow.AddHours(2),
            Guid.NewGuid(),
            "#3B82F6",
            EventCategory.Online,
            "Description");
    }
}