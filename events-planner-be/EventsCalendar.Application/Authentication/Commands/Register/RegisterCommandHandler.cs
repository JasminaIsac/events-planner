using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Authentication.Responses;
using EventsCalendar.Application.Common.Results;

namespace EventsCalendar.Application.Authentication.Commands.Register
{
    public class RegisterCommandHandler : ICommandHandler<RegisterCommand, AuthResponse>
    {
        private readonly IIdentityService _identityService;

        public RegisterCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }
        public async Task<Result<AuthResponse>> Handle( RegisterCommand request, CancellationToken cancellationToken)
        {
            return await _identityService.RegisterAsync(
                request.FirstName,
                request.LastName,
                request.Email,
                request.Phone,
                request.Password,
                cancellationToken);
        }
    }
}
