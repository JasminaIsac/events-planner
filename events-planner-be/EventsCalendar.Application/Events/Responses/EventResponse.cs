using EventsCalendar.Domain.Entities;
using EventsCalendar.Domain.Enums;

namespace EventsCalendar.Application.Events.Responses
{
    public class EventResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public EventCategory Category { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public Guid OrganizerId { get; set; }
        public string Color { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }

        public EventResponse(Event ev)
        {
            Id = ev.Id;
            Title = ev.Title;
            Description = ev.Description;
            Category = ev.Category;
            StartDateTime = ev.StartDateTime;
            EndDateTime = ev.EndDateTime;
            OrganizerId = ev.OrganizerId;
            Color = ev.Color;
            CreatedAt = ev.CreatedAt;
            UpdatedAt = ev.UpdatedAt;
            IsDeleted = ev.IsDeleted;
        }
    }
}
