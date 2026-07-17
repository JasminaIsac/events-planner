using EventsCalendar.Application.Abstractions.Persistence;
using EventsCalendar.Application.Events.Queries.GetEventsByDateRange;
using EventsCalendar.Domain.Entities;
using EventsCalendar.Domain.Enums;
using FluentAssertions;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Events.Queries;

public class GetEventsByDateRangeQueryHandlerTests
{
    private readonly IEventRepository _eventRepository =
        Substitute.For<IEventRepository>();

    [Fact]
    public async Task Handle_ShouldReturnEventsInRange()
    {
        var events = new List<Event>
        {
            new(
                "Workshop",
                DateTime.UtcNow.AddDays(1),
                DateTime.UtcNow.AddDays(1).AddHours(2),
                Guid.NewGuid(),
                "#22C55E",
                EventCategory.Offline,
                "Description")
        };

        var startDate = DateTime.UtcNow;
        var endDate = DateTime.UtcNow.AddDays(7);

        _eventRepository
            .GetByDateRange(
                startDate,
                endDate,
                Arg.Any<CancellationToken>())
            .Returns(events);

        var handler = new GetEventsByDateRangeQueryHandler(
            _eventRepository);

        var result = await handler.Handle(
            new GetEventsByDateRangeQuery(startDate, endDate),
            CancellationToken.None);

        result.IsSuccess.Should().BeTrue();
        result.Value.Should().HaveCount(1);
        result.Value![0].Title.Should().Be("Workshop");
    }
}