using EventsCalendar.Domain.Common;
using EventsCalendar.Domain.Enums;

namespace EventsCalendar.Domain.Entities
{
    public class Event
    {
        public Guid Id { get; private set; } = Guid.NewGuid();
        public string Title { get; private set; } = string.Empty;
        public string? Description { get; private set; }
        public EventCategory Category { get; private set; }
        public DateTime StartDateTime { get; private set; }
        public DateTime EndDateTime { get; private set; }
        public Guid OrganizerId { get; private set; }
        public string Color { get; private set; } = "#3B82F6";
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; private set; } = null;
        public bool IsDeleted { get; private set; } = false;

        private Event() { }

        public Event(
            string title,
            DateTime startDateTime,
            DateTime endDateTime,
            Guid organizerId,
            string color,
            EventCategory category,
            string? description
        )
        {
            Guard.AgainstNullOrWhiteSpace(title, nameof(title));

            if (organizerId == Guid.Empty)
                throw new ArgumentException("Organizer id is required.", nameof(organizerId));

            if (endDateTime <= startDateTime)
                throw new ArgumentException("End date must be after start date.", nameof(endDateTime));

            Title = title;
            Description = description;
            Category = category;
            StartDateTime = startDateTime;
            EndDateTime = endDateTime;
            OrganizerId = organizerId;
            Color = string.IsNullOrWhiteSpace(color) ? "#3B82F6" : color;
        }

        public void UpdateDetails(
            string title,
            DateTime startDateTime,
            DateTime endDateTime,
            string color,
            EventCategory category,
            string? description
            )
        {
            Guard.AgainstNullOrWhiteSpace(title, nameof(title));
            Guard.AgainstNullOrWhiteSpace(color, nameof(color));

            if (endDateTime <= startDateTime)
                throw new ArgumentException("End date must be after start date.", nameof(endDateTime));

            Title = title;
            StartDateTime = startDateTime;
            EndDateTime = endDateTime;
            Color = color;
            Category = category;
            Description = description;
            UpdatedAt = DateTime.UtcNow;
        }

        public void MarkAsDeleted()
        {
            if (IsDeleted) return;

            IsDeleted = true;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
