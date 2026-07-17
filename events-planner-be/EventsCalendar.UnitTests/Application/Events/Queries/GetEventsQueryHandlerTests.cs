using EventsCalendar.Application.Abstractions.Persistence;
using EventsCalendar.Application.Events.Queries.GetEvents;
using EventsCalendar.Domain.Entities;
using EventsCalendar.Domain.Enums;
using FluentAssertions;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Events.Queries;

public class GetEventsQueryHandlerTests
{
    private readonly IEventRepository _eventRepository = Substitute.For<IEventRepository>();

    [Fact]
    public async Task Handle_ShouldReturnEvents()
    {
        var events = new List<Event>
        {
            new(
                "Team Meeting",
                DateTime.UtcNow.AddHours(1),
                DateTime.UtcNow.AddHours(2),
                Guid.NewGuid(),
                "#3B82F6",
                EventCategory.Online,
                "Description")
        };

        _eventRepository
            .GetAllAsync(Arg.Any<CancellationToken>())
            .Returns(events);

        var handler = new GetEventsQueryHandler(_eventRepository);

        var result = await handler.Handle(
            new GetEventsQuery(),
            CancellationToken.None);

        result.IsSuccess.Should().BeTrue();
        result.Value.Should().HaveCount(1);
        result.Value![0].Title.Should().Be("Team Meeting");
    }
}