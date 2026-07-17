using EventsCalendar.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventsCalendar.Infrastructure.Persistence.Configurations;

public class EventConfiguration : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> builder)
    {
        builder.ToTable("events");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Title).IsRequired().HasMaxLength(200);
        builder.Property(e => e.Description).HasMaxLength(1000);
        builder.Property(e => e.Category).HasConversion<string>().IsRequired().HasMaxLength(50);
        builder.Property(e => e.StartDateTime).IsRequired();
        builder.Property(e => e.EndDateTime).IsRequired();
        builder.Property(e => e.OrganizerId).IsRequired();
        builder.Property(e => e.Color).IsRequired().HasMaxLength(20);
        builder.Property(e => e.CreatedAt).IsRequired();
        builder.Property(e => e.UpdatedAt);
        builder.Property(e => e.IsDeleted).IsRequired();
    }
}