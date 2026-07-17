using EventsCalendar.Application.Abstractions.Persistence;
using EventsCalendar.Domain.Entities;
using EventsCalendar.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EventsCalendar.Infrastructure.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly AppDbContext _context;

        public EventRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Event>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _context.Events
                .AsNoTracking()
                .Where(e => !e.IsDeleted)
                .ToListAsync(cancellationToken);
        }

        public async Task<List<Event>> GetByDateRange(DateTime startDate, DateTime endDate, CancellationToken cancellationToken)
        {
            return await _context.Events
                .AsNoTracking()
                .Where (e => !e.IsDeleted)
                .Where(e => e.StartDateTime < endDate && e.EndDateTime > startDate)
                .OrderBy(e => e.StartDateTime)
                .ThenBy(e => e.EndDateTime)
                .ToListAsync(cancellationToken);
        }

        public async Task<Event?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Events
                .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted, cancellationToken);
        }

        public async Task<List<Event>> GetByOrganizerAsync(Guid organizerId, CancellationToken cancellationToken)
        {
            return await _context.Events
                .AsNoTracking()
                .Where(e => e.OrganizerId == organizerId && !e.IsDeleted)
                .OrderBy(e => e.StartDateTime)
                .ToListAsync(cancellationToken);
        }
        
        public async Task AddAsync(Event newEvent, CancellationToken cancellationToken)
        {
            await _context.Events.AddAsync(newEvent, cancellationToken);
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
