using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Authentication.Responses;
using EventsCalendar.Application.Common.Results;

namespace EventsCalendar.Application.Authentication.Commands.Login
{
    public class LoginCommandHandler : ICommandHandler<LoginCommand, AuthResponse>
    {
        private readonly IIdentityService _identityService;

        public LoginCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<Result<AuthResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            return await _identityService.LoginAsync(request.Email, request.Password, cancellationToken);
        }
    }
}
