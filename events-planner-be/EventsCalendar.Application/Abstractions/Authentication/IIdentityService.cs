using EventsCalendar.Application.Authentication.Responses;
using EventsCalendar.Application.Common.Results;

namespace EventsCalendar.Application.Abstractions.Authentication
{
    public interface IIdentityService
    {
        Task<Result<AuthResponse>> RegisterAsync(
            string firstName,
            string lastName,
            string email,
            string phone,
            string password,
            CancellationToken cancellationToken = default);

        Task<Result<AuthResponse>> LoginAsync(
            string email,
            string password,
            CancellationToken cancellationToken = default);
    }
}
