using EventsCalendar.Domain.Constants;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace EventsCalendar.Infrastructure.Persistence.Seed
{
    public static class IdentitySeeder
    {
        public static async Task SeedRolesAsync(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();

            var roles = new[]
            {
                Roles.Viewer,
                Roles.Organizer,
                Roles.Admin
            };

            foreach (var role in roles)
            {
                var exists = await roleManager.RoleExistsAsync(role);

                if(!exists)
                {
                    var result = await roleManager.CreateAsync(new IdentityRole<Guid>(role));

                    if (!result.Succeeded)
                    {
                        var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                        throw new Exception($"Failed to create role {role}: {errors}");
                    }
                }
            }
        }
    }
}
