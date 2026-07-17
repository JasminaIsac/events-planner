using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Abstractions.Persistence;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Events.Commands.CreateEvent;
using EventsCalendar.Domain.Entities;
using EventsCalendar.Domain.Enums;
using FluentAssertions;
using FluentValidation;
using FluentValidation.Results;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Events.Commands;

public class CreateEventCommandHandlerTests
{
    private readonly IEventRepository _eventRepository =
        Substitute.For<IEventRepository>();

    private readonly ICurrentUserService _currentUserService =
        Substitute.For<ICurrentUserService>();

    private readonly IValidator<CreateEventCommand> _validator =
        Substitute.For<IValidator<CreateEventCommand>>();

    private readonly CreateEventCommandHandler _handler;

    public CreateEventCommandHandlerTests()
    {
        _handler = new CreateEventCommandHandler(
            _eventRepository,
            _currentUserService,
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

        _currentUserService
            .DidNotReceive()
            .GetUserId();

        await _eventRepository
            .DidNotReceive()
            .AddAsync(Arg.Any<Event>(), Arg.Any<CancellationToken>());

        await _eventRepository
            .DidNotReceive()
            .SaveChangesAsync(Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Handle_ShouldReturnFailure_WhenCurrentUserIsMissing()
    {
        var command = CreateCommand();

        _validator
            .ValidateAsync(command, Arg.Any<CancellationToken>())
            .Returns(new ValidationResult());

        _currentUserService
            .GetUserId()
            .Returns(Result<Guid>.Failure(
                new Error("User.Unauthorized", "User is not authenticated.")));

        var result = await _handler.Handle(command, CancellationToken.None);

        result.IsFailure.Should().BeTrue();
        result.Error!.Code.Should().Be("User.Unauthorized");

        await _eventRepository
            .DidNotReceive()
            .AddAsync(Arg.Any<Event>(), Arg.Any<CancellationToken>());

        await _eventRepository
            .DidNotReceive()
            .SaveChangesAsync(Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Handle_ShouldCreateEvent_WhenRequestIsValid()
    {
        var command = CreateCommand();
        var userId = Guid.NewGuid();

        _validator
            .ValidateAsync(command, Arg.Any<CancellationToken>())
            .Returns(new ValidationResult());

        _currentUserService
            .GetUserId()
            .Returns(Result<Guid>.Success(userId));

        var result = await _handler.Handle(command, CancellationToken.None);

        result.IsSuccess.Should().BeTrue();
        result.Value!.Title.Should().Be(command.Title);
        result.Value.OrganizerId.Should().Be(userId);
        result.Value.Category.Should().Be(command.Category);

        await _eventRepository
            .Received(1)
            .AddAsync(
                Arg.Is<Event>(e =>
                    e.Title == command.Title &&
                    e.OrganizerId == userId),
                Arg.Any<CancellationToken>());

        await _eventRepository
            .Received(1)
            .SaveChangesAsync(Arg.Any<CancellationToken>());
    }

    private static CreateEventCommand CreateCommand()
    {
        return new CreateEventCommand(
            "Team Meeting",
            "Planning session",
            EventCategory.Online,
            DateTime.UtcNow.AddHours(1),
            DateTime.UtcNow.AddHours(2),
            "#3B82F6");
    }
}