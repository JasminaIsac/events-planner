namespace EventsCalendar.Application.Authentication.Responses
{
    public sealed record AuthResponse(string AccessToken, string RefreshToken);

    public sealed record PublicAuthResponse(string AccessToken);
    
}
