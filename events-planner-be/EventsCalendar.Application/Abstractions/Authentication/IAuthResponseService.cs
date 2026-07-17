using EventsCalendar.Application.Authentication.Responses;

namespace EventsCalendar.Application.Abstractions.Authentication
{
    public interface IAuthResponseService
    {
        Task<AuthResponse> GenerateAsync(
            Guid userId,
            string email,
            CancellationToken cancellationToken = default);
    }
}
