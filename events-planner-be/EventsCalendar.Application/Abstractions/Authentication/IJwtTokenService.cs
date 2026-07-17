namespace EventsCalendar.Application.Abstractions.Authentication
{
    public interface IJwtTokenService
    {
        string GenerateAccessToken(Guid userId, string email, IEnumerable<string> roles);

        string GenerateRefreshToken();
    }
}
