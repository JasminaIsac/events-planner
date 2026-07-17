using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Authentication.Responses;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Domain.Entities;
using EventsCalendar.Infrastructure.Identity;
using EventsCalendar.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EventsCalendar.Infrastructure.Authentication
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly IJwtTokenService _jwtTokenService;
        private readonly AppDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public RefreshTokenService(
            IJwtTokenService jwtTokenService,
            AppDbContext context,
            UserManager<ApplicationUser> userManager)
        {
            _jwtTokenService = jwtTokenService;
            _context = context;
            _userManager = userManager;
        }

        public async Task<string> CreateAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            var refreshTokenValue = _jwtTokenService.GenerateRefreshToken();

            var refreshToken = new RefreshToken(
                refreshTokenValue,
                userId,
                DateTime.UtcNow.AddDays(7));

            _context.RefreshTokens.Add(refreshToken);

            await _context.SaveChangesAsync(cancellationToken);

            return refreshTokenValue;
        }

        public async Task<Result<AuthResponse>> RefreshAsync(
            string refreshToken,
            CancellationToken cancellationToken = default)
        {
            var existingToken = await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken, cancellationToken);

            if (existingToken is null || !existingToken.IsActive)
            {
                return Result<AuthResponse>.Failure(
                    new Error("Auth.InvalidRefreshToken", "Invalid or expired refresh token."));
            }

            var user = await _userManager.FindByIdAsync(
                existingToken.UserId.ToString());

            if (user is null)
            {
                return Result<AuthResponse>.Failure(
                    new Error("Auth.UserNotFound", "User not found."));
            }

            existingToken.Revoke();

            var roles = await _userManager.GetRolesAsync(user);

            var accessToken = _jwtTokenService.GenerateAccessToken(
                user.Id,
                user.Email!,
                roles);

            var newRefreshTokenValue = _jwtTokenService.GenerateRefreshToken();

            var newRefreshToken = new RefreshToken(
                newRefreshTokenValue,
                user.Id,
                DateTime.UtcNow.AddDays(7));

            _context.RefreshTokens.Add(newRefreshToken);

            await _context.SaveChangesAsync(cancellationToken);

            return Result<AuthResponse>.Success(
                new AuthResponse(accessToken, newRefreshTokenValue));
        }

        public async Task RevokeAsync(
            string refreshToken,
            CancellationToken cancellationToken = default)
        {
            var existingToken = await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken, cancellationToken);

            if (existingToken is not null && existingToken.IsActive)
            {
                existingToken.Revoke();
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
