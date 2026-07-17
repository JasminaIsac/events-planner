using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Domain.Entities;
using EventsCalendar.Domain.Enums;
using EventsCalendar.Infrastructure.Authorization;
using FluentAssertions;
using NSubstitute;

namespace EventsCalendar.UnitTests.Infrastructure.Authorization
{
    public class EventAuthorizationServiceTests
    {
        private readonly ICurrentUserService _currentUserService = Substitute.For<ICurrentUserService>();
        private readonly EventAuthorizationService _authorizationService;

        public EventAuthorizationServiceTests()
        {
            _authorizationService = new EventAuthorizationService(_currentUserService);

        }

        [Fact]
        public void CanModify_ShouldReturnSuccess_WhenUserIsOrganizer()
        {
            var organizerId = Guid.NewGuid();

            _currentUserService.GetUserId().Returns(Result<Guid>.Success(organizerId));

            var existingEvent = CreateEvent(organizerId);

            var result = _authorizationService.CanModify(existingEvent);

            result.IsSuccess.Should().BeTrue();
        }

        [Fact]
        public void CanModify_ShouldReturnFailure_WhenUserIsNotOrganizer()
        {
            var organizerId = Guid.NewGuid();
            var otherUserId = Guid.NewGuid();

            _currentUserService.GetUserId().Returns(Result<Guid>.Success(otherUserId));

            var existingEvent = CreateEvent(organizerId);

            var result = _authorizationService.CanModify(existingEvent);

            result.IsSuccess.Should().BeFalse();
            result.Error?.Code.Should().Be("Auth.Forbidden");
        }

        [Fact]
        public void CanModify_ShouldReturnFailure_WhenCurrentUserIsMissing()
        {
            _currentUserService
                .GetUserId()
                .Returns(Result<Guid>
                .Failure(new Error("Auth.Unauthorized", "User is not authenticated.")));

            var existingEvent = CreateEvent(Guid.NewGuid());

            var result = _authorizationService.CanModify(existingEvent);

            result.IsSuccess.Should().BeFalse();
            result.Error?.Code.Should().Be("Auth.UserIdRetrievalFailed");
        }

        private static Event CreateEvent(Guid organizerId)
        {
            return new Event(
                "Team Meeting",
                DateTime.UtcNow.AddHours(1),
                DateTime.UtcNow.AddHours(2),
                organizerId,
                "#3B82F6",
                EventCategory.Online,
                "Description");
        }
    }
}
