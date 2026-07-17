using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Abstractions.Users;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Users.Responses;
using EventsCalendar.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EventsCalendar.Infrastructure.Users
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ICurrentUserService _currentUserService;

        public UserService(
            UserManager<ApplicationUser> userManager,
            ICurrentUserService currentUserService)
        {
            _userManager = userManager;
            _currentUserService = currentUserService;
        }

        public async Task<Result<List<UserResponse>>> GetAllAsync(
            CancellationToken cancellationToken)
        {
            var users = await _userManager.Users.ToListAsync(cancellationToken);

            var result = new List<UserResponse>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);

                result.Add(new UserResponse(
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.Email!,
                    user.PhoneNumber,
                    roles.ToList(),
                    user.IsActive,
                    user.CreatedAt,
                    user.UpdatedAt));
            }

            return Result<List<UserResponse>>
                .Success(result);
        }

        public async Task<Result<UserResponse>> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

            if (user is null)
                return Result<UserResponse>.Failure(
                    new Error("User.NotFound", "User not found."));

            var roles = await _userManager.GetRolesAsync(user);

            return Result<UserResponse>.Success(
                new UserResponse(
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.Email!,
                    user.PhoneNumber,
                    roles.ToList(),
                    user.IsActive,
                    user.CreatedAt,
                    user.UpdatedAt));
        }

        public async Task<Result<UserResponse>> GetCurrentUserAsync(
            CancellationToken cancellationToken)
        {
            var userIdResult = _currentUserService.GetUserId();

            if (userIdResult.IsFailure)
                return Result<UserResponse>.Failure(userIdResult.Error!);

            return await GetByIdAsync(userIdResult.Value, cancellationToken);
        }

        public async Task<Result<UserResponse>> UpdateCurrentUserAsync(
            string firstName,
            string lastName,
            string phone,
            CancellationToken cancellationToken)
        {
            var userIdResult = _currentUserService.GetUserId();

            if (userIdResult.IsFailure)
                return Result<UserResponse>.Failure(userIdResult.Error!);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userIdResult.Value, cancellationToken);

            if (user is null)
                return Result<UserResponse>.Failure(
                    new Error("User.NotFound", "User not found."));

            user.FirstName = firstName;
            user.LastName = lastName;
            user.PhoneNumber = phone;
            user.UpdatedAt = DateTime.UtcNow;

            var updateResult = await _userManager.UpdateAsync(user);

            if (!updateResult.Succeeded)
                return Result<UserResponse>.Failure(
                    new Error("User.UpdateFailed", string.Join("; ", updateResult.Errors.Select(e => e.Description))));

            var roles = await _userManager.GetRolesAsync(user);

            return Result<UserResponse>.Success(
                new UserResponse(
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.Email!,
                    user.PhoneNumber,
                    roles.ToList(),
                    user.IsActive,
                    user.CreatedAt,
                    user.UpdatedAt));
        }

        public async Task<Result> ChangePasswordAsync(
            string currentPassword,
            string newPassword,
            CancellationToken cancellationToken)
        {
            var userIdResult = _currentUserService.GetUserId();

            if (userIdResult.IsFailure)
                return Result.Failure(userIdResult.Error!);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userIdResult.Value, cancellationToken);

            if (user is null)
                return Result.Failure(
                    new Error("User.NotFound", "User not found."));

            var changePasswordResult = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);

            if (!changePasswordResult.Succeeded)
                return Result.Failure(
                    new Error("User.ChangePasswordFailed", string.Join("; ", changePasswordResult.Errors.Select(e => e.Description))));

            user.UpdatedAt = DateTime.UtcNow;
            await _userManager.UpdateAsync(user);

            return Result.Success();
        }

        public async Task<Result> DeactivateAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

            if (user is null)
                return Result.Failure(
                    new Error("User.NotFound", "User not found."));

            user.IsActive = false;
            user.UpdatedAt = DateTime.UtcNow;

            var updateResult = await _userManager.UpdateAsync(user);

            if (!updateResult.Succeeded)
                return Result.Failure(
                    new Error("User.DeactivateFailed", string.Join("; ", updateResult.Errors.Select(e => e.Description))));

            return Result.Success();
        }
    }
}
