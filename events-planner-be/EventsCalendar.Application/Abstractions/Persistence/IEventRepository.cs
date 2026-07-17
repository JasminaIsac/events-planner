using EventsCalendar.Domain.Entities;

namespace EventsCalendar.Application.Abstractions.Persistence
{
    public interface IEventRepository
    {
        Task<List<Event>> GetAllAsync(CancellationToken cancellationToken);
        Task<List<Event>> GetByDateRange(DateTime startDate, DateTime endDate, CancellationToken cancellationToken);
        Task<Event?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<List<Event>> GetByOrganizerAsync(Guid organizerId, CancellationToken cancellationToken);
        Task AddAsync(Event newEvent, CancellationToken cancellationToken);
        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}
