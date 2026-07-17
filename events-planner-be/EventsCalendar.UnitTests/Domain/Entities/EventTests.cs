using EventsCalendar.Domain.Entities;
using EventsCalendar.Domain.Enums;
using FluentAssertions;

namespace EventsCalendar.UnitTests.Domain.Entities;

public class EventTests
{
    [Fact]
    public void Create_ShouldCreateEvent_WhenDataIsValid()
    {
        var organizerId = Guid.NewGuid();

        var ev = new Event(
            "Team Meeting",
            DateTime.UtcNow.AddHours(1),
            DateTime.UtcNow.AddHours(2),
            organizerId,
            "#3B82F6",
            EventCategory.Online,
            "Description");

        ev.Title.Should().Be("Team Meeting");
        ev.OrganizerId.Should().Be(organizerId);
        ev.IsDeleted.Should().BeFalse();
    }

    [Fact]
    public void Create_ShouldThrowException_WhenEndDateIsBeforeStartDate()
    {
        var act = () => new Event(
            "Invalid Event",
            DateTime.UtcNow.AddHours(2),
            DateTime.UtcNow.AddHours(1),
            Guid.NewGuid(),
            "#3B82F6",
            EventCategory.Online,
            null);

        act.Should().Throw<ArgumentException>();
    }
}