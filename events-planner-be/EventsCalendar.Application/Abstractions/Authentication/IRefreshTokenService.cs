using EventsCalendar.Application.Authentication.Responses;
using EventsCalendar.Application.Common.Results;

namespace EventsCalendar.Application.Abstractions.Authentication
{
    public interface IRefreshTokenService
    {
        Task<string> CreateAsync(Guid userId, CancellationToken cancellationToken = default);

        Task<Result<AuthResponse>> RefreshAsync(string refreshToken, CancellationToken cancellationToken = default);

        Task RevokeAsync(string refreshToken, CancellationToken cancellationToken = default);
    }
}
