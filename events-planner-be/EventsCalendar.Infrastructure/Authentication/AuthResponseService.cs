using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Authentication.Responses;
using EventsCalendar.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace EventsCalendar.Infrastructure.Authentication;

public class AuthResponseService : IAuthResponseService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IRefreshTokenService _refreshTokenService;

    public AuthResponseService(
        UserManager<ApplicationUser> userManager,
        IJwtTokenService jwtTokenService,
        IRefreshTokenService refreshTokenService)
    {
        _userManager = userManager;
        _jwtTokenService = jwtTokenService;
        _refreshTokenService = refreshTokenService;
    }

    public async Task<AuthResponse> GenerateAsync(
        Guid userId,
        string email,
        CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());

        var roles = await _userManager.GetRolesAsync(user!);

        var accessToken = _jwtTokenService.GenerateAccessToken(
            userId,
            email,
            roles);

        var refreshToken = await _refreshTokenService.CreateAsync(
            userId,
            cancellationToken);

        return new AuthResponse(accessToken, refreshToken);
    }
}