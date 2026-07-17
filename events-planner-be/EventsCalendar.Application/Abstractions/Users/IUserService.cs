using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Users.Responses;

namespace EventsCalendar.Application.Abstractions.Users
{
    public interface IUserService
    {
        Task<Result<List<UserResponse>>> GetAllAsync(
            CancellationToken cancellationToken = default);

        Task<Result<UserResponse>> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken = default);

        Task<Result<UserResponse>> GetCurrentUserAsync(
            CancellationToken cancellationToken = default);

        Task<Result<UserResponse>> UpdateCurrentUserAsync(
            string firstName,
            string lastName,
            string phone,
            CancellationToken cancellationToken = default);

        Task<Result> ChangePasswordAsync(
            string currentPassword,
            string newPassword,
            CancellationToken cancellationToken = default);

        Task<Result> DeactivateAsync(
            Guid id,
            CancellationToken cancellationToken = default);
    }
}
