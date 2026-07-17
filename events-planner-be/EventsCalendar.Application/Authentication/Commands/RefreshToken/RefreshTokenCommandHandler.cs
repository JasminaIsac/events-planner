using EventsCalendar.Application.Abstractions.Authentication;
using EventsCalendar.Application.Abstractions.Messaging;
using EventsCalendar.Application.Authentication.Responses;
using EventsCalendar.Application.Common.Results;
using EventsCalendar.Application.Common.Validators;
using FluentValidation;

namespace EventsCalendar.Application.Authentication.Commands.RefreshToken
{
    public class RefreshTokenCommandHandler : ICommandHandler<RefreshTokenCommand, AuthResponse>
    {
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly IValidator<RefreshTokenCommand> _validator;

        public RefreshTokenCommandHandler(
            IRefreshTokenService refreshTokenService,
            IValidator<RefreshTokenCommand> validator)
        {
            _refreshTokenService = refreshTokenService;
            _validator = validator;
        }

        public async Task<Result<AuthResponse>> Handle(
            RefreshTokenCommand request, 
            CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);

            if(!validationResult.IsValid) 
                return Result<AuthResponse>.Failure(validationResult.ToError());

            return await _refreshTokenService.RefreshAsync(request.RefreshToken, cancellationToken);
        }
    }
}
