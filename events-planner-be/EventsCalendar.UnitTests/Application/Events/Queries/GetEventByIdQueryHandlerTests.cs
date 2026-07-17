using EventsCalendar.Application.Abstractions.Persistence;
using EventsCalendar.Application.Events.Queries.GetEventById;
using EventsCalendar.Domain.Entities;
using EventsCalendar.Domain.Enums;
using FluentAssertions;
using NSubstitute;

namespace EventsCalendar.UnitTests.Application.Events.Queries
{
    public class GetEventByIdQueryHandlerTests
    {
        private readonly IEventRepository _eventRepository = Substitute.For<IEventRepository>();

        [Fact]
        public async Task Handle_ShouldReturnEvent()
        {
            var handler = new GetEventByIdQueryHandler(_eventRepository);

            var eventId = Guid.NewGuid();

            var eventEntity = new Event(
                "Team Meeting",
                DateTime.UtcNow.AddHours(1),
                DateTime.UtcNow.AddHours(2),
                Guid.NewGuid(),
                "#3B82F6",
                EventCategory.Online,
                "Description");

            _eventRepository
                .GetByIdAsync(eventEntity.Id, Arg.Any<CancellationToken>())
                .Returns(eventEntity);

            var result = await handler.Handle(
                new GetEventByIdQuery(eventEntity.Id),
                CancellationToken.None);

            result.IsSuccess.Should().BeTrue();
            result.Value.Should().NotBeNull();
            result.Value!.Title.Should().Be("Team Meeting");
            result.Value.Description.Should().Be("Description");
        }

        [Fact]
        public async Task Handle_ShouldReturnFailure_WhenEventDoesNotExist()
        {
            var handler = new GetEventByIdQueryHandler(_eventRepository);
            var id = Guid.NewGuid();

            _eventRepository
                .GetByIdAsync(id, Arg.Any<CancellationToken>())
                .Returns((Event?)null);

            var result = await handler.Handle(
                new GetEventByIdQuery(id),
                CancellationToken.None);

            result.IsFailure.Should().BeTrue();
            result.Error!.Code.Should().Be("Event.NotFound");
        }
    }
}
