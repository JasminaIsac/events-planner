namespace EventsCalendar.Application.Users.Responses
{
    public record UserResponse(
        Guid Id,
        string FirstName,
        string LastName,
        string Email,
        string? Phone,
        IReadOnlyCollection<string> Roles,
        bool IsActive,
        DateTime CreatedAt,
        DateTime? UpdatedAt);
}