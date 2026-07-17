using EventsCalendar.Api.Extensions;
using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Authentication.Commands.Login;
using EventsCalendar.Application.Authentication.Commands.RefreshToken;
using EventsCalendar.Application.Authentication.Commands.Register;
using EventsCalendar.Application.Authentication.Responses;
using Flowify.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace EventsCalendar.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IRefreshTokenService _refreshTokenService;

        public AuthController(IMediator mediator, IRefreshTokenService refreshTokenService)
        {
            _mediator = mediator;
            _refreshTokenService = refreshTokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);

            if (!result.IsSuccess)
                return result.ToActionResult(this);

            var internalResponse = result.Value!;

            SetRefreshTokenCookie(internalResponse.RefreshToken);

            return Ok(new PublicAuthResponse(internalResponse.AccessToken));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);

            if (!result.IsSuccess)
                return result.ToActionResult(this);

            var internalResponse = result.Value!;

            SetRefreshTokenCookie(internalResponse.RefreshToken);

            return Ok(new PublicAuthResponse(internalResponse.AccessToken));
        }


        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken(CancellationToken cancellationToken)
        {
            if (!Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
                return Unauthorized(new { message = "Refresh token not found" });
            
            var command = new RefreshTokenCommand(refreshToken);
            var result = await _mediator.Send(command, cancellationToken);

            if (!result.IsSuccess)
                return result.ToActionResult(this);

            var internalResponse = result.Value!;

            SetRefreshTokenCookie(internalResponse.RefreshToken);

            return Ok(new PublicAuthResponse(internalResponse.AccessToken));
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout(CancellationToken cancellationToken)
        {
            if (Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
                await _refreshTokenService.RevokeAsync(refreshToken, cancellationToken);

            Response.Cookies.Delete("refreshToken");
            return Ok(new { message = "Logged out successfully" });
        }

        private void SetRefreshTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }
    }
}