using EventsCalendar.Application;
using EventsCalendar.Infrastructure;
using EventsCalendar.Infrastructure.Persistence.Seed;
using System.Text.Json.Serialization; 
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

const string CorsPolicy = "CorsPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });

builder.Services.AddOpenApi();

builder.Services.AddApplication();

builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();

    await IdentitySeeder.SeedRolesAsync(scope.ServiceProvider);
    await DbSeeder.SeedAsync(scope.ServiceProvider);

    app.MapOpenApi();

    app.MapScalarApiReference();

    app.MapGet("/api", () => Results.Redirect("/scalar/v1"));
}

app.UseHttpsRedirection();

app.UseCors(CorsPolicy);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => "EventsCalendar API is running");

app.Run();
