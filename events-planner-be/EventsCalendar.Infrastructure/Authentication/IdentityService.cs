using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Authentication.Responses;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Domain.Constants;
using EventsCalendar.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace EventsCalendar.Infrastructure.Authentication
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthResponseService _authResponseService;

        public IdentityService(
            UserManager<ApplicationUser> userManager,
            IAuthResponseService authResponseService)
        {
            _userManager = userManager;
            _authResponseService = authResponseService;
        }

        public async Task<Result<AuthResponse>> RegisterAsync(
            string firstName, 
            string lastName, 
            string email, 
            string phone, 
            string password, 
            CancellationToken cancellationToken = default)
        {
            var existingUser = await _userManager.FindByEmailAsync(email);

            if (existingUser is not null)
            {
                return Result<AuthResponse>.Failure(
                    new Error("Users.EmailAlreadyExists", "User with this email already exists."));
            }

            var user = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                UserName = email,
                PhoneNumber = phone,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            var createResult = await _userManager.CreateAsync(user, password);

            if (!createResult.Succeeded)
            {
                var message = string.Join(", ", createResult.Errors.Select(e => e.Description));

                return Result<AuthResponse>.Failure(new Error("Users.CreateFailed", message));
            }

            var roleResult = await _userManager.AddToRoleAsync(user, Roles.Organizer);

            if (!roleResult.Succeeded)
            {
                var message = string.Join(", ", roleResult.Errors.Select(e => e.Description));

                return Result<AuthResponse>.Failure(new Error("Users.RoleAssignFailed", message));
            }

            var authResponse = await _authResponseService.GenerateAsync(
                user.Id,
                user.Email!,
                cancellationToken);

            return Result<AuthResponse>.Success(authResponse);
        }

        public async Task<Result<AuthResponse>> LoginAsync(
            string email,
            string password,
            CancellationToken cancellationToken = default)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return Result<AuthResponse>.Failure(new Error("Users.InvalidCredentials", "Invalid email or password."));
            }

            if(!user.IsActive)
            {
                return Result<AuthResponse>.Failure(new Error("Users.Inactive", "User account is inactive."));
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, password);

            if (!isPasswordValid)
            {
                return Result<AuthResponse>.Failure(new Error("Users.InvalidCredentials", "Invalid email or password."));
            }

            var authResponse = await _authResponseService.GenerateAsync(
                user.Id,
                user.Email!,
                cancellationToken);

            return Result<AuthResponse>.Success(authResponse);
        }
    }
}
