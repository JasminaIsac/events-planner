using EventsCalendar.Domain.Constants;
using EventsCalendar.Domain.Entities;
using EventsCalendar.Domain.Enums;
using EventsCalendar.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace EventsCalendar.Infrastructure.Persistence.Seed;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<AppDbContext>();
        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        if (await userManager.Users.AnyAsync())
            return;

        var user1 = new ApplicationUser
        {
            Id = Guid.NewGuid(),
            FirstName = "John",
            LastName = "Doe",
            Email = "john@example.com",
            UserName = "john@example.com",
            PhoneNumber = "+37360000001",
            CreatedAt = DateTime.UtcNow,
            IsActive = true
        };

        var user2 = new ApplicationUser
        {
            Id = Guid.NewGuid(),
            FirstName = "Jane",
            LastName = "Smith",
            Email = "jane@example.com",
            UserName = "jane@example.com",
            PhoneNumber = "+37360000002",
            CreatedAt = DateTime.UtcNow,
            IsActive = true
        };

        await userManager.CreateAsync(user1, "Password123!");
        await userManager.CreateAsync(user2, "Password123!");

        await userManager.AddToRoleAsync(user1, Roles.Organizer);
        await userManager.AddToRoleAsync(user2, Roles.Organizer);

        var event1 = new Event(
            "Team Meeting",
            DateTime.UtcNow.AddDays(1),
            DateTime.UtcNow.AddDays(1).AddHours(2),
            user1.Id,
            "#3B82F6",
            EventCategory.Offline,
            "Sprint planning meeting"
        );

        var event2 = new Event(
            "Online Workshop",
            DateTime.UtcNow.AddDays(2),
            DateTime.UtcNow.AddDays(2).AddHours(1),
            user1.Id,
            "#10B981",
            EventCategory.Online,
            "Frontend workshop"
        );

        var event3 = new Event(
            "Client Call",
            DateTime.UtcNow.AddDays(3),
            DateTime.UtcNow.AddDays(3).AddHours(1),
            user2.Id,
            "#F59E0B",
            EventCategory.Online,
            "Project sync"
        );

        context.Events.AddRange(event1, event2, event3);

        await context.SaveChangesAsync();
    }
}