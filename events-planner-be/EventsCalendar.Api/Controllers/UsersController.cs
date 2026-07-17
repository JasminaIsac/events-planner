using EventsCalendar.Api.Extensions;
using EventsCalendar.Application.Users.Commands.ChangePassword;
using EventsCalendar.Application.Users.Commands.DeactivateUser;
using EventsCalendar.Application.Users.Commands.UpdateCurrentUser;
using EventsCalendar.Application.Users.Queries.GetCurrentUser;
using EventsCalendar.Application.Users.Queries.GetUserById;
using EventsCalendar.Application.Users.Queries.GetUsers;
using EventsCalendar.Domain.Constants;
using Flowify.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventsCalendar.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpGet]
        public async Task<IActionResult> GetUsers(CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(new GetUsersQuery(), cancellationToken);

            return result.ToActionResult(this);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetUserById(Guid id, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(new GetUserByIdQuery(id), cancellationToken);

            return result.ToActionResult(this);
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser(CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(new GetCurrentUserQuery(), cancellationToken);

            return result.ToActionResult(this);
        }

        [HttpPut("me")]
        public async Task<IActionResult> UpdateCurrentUser(
            [FromBody] UpdateCurrentUserCommand command, 
            CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);

            return result.ToActionResult(this);
        }

        [HttpPost("me/change-password")]
        public async Task<IActionResult> ChangePassword(
            ChangePasswordCommand command, 
            CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);

            return result.ToActionResult(this);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("{id:guid}/deactivate")]
        public async Task<IActionResult> DeactivateUser(Guid id, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(
                new DeactivateUserCommand(id),
                cancellationToken);

            return result.ToActionResult(this);
        }
    }

}
