using Flowify.Extensions;
using Microsoft.Extensions.DependencyInjection;
using FluentValidation;

namespace EventsCalendar.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddFlowify(typeof(DependencyInjection).Assembly);
        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);

        return services;
    }
}