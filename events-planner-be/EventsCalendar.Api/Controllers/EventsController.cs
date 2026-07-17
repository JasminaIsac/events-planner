using EventsCalendar.Api.Extensions;
using EventsCalendar.Application.Events.Commands.CreateEvent;
using EventsCalendar.Application.Events.Commands.DeleteEvent;
using EventsCalendar.Application.Events.Commands.UpdateEvent;
using EventsCalendar.Application.Events.Queries.GetEventById;
using EventsCalendar.Application.Events.Queries.GetEvents;
using EventsCalendar.Application.Events.Queries.GetEventsByDateRange;
using EventsCalendar.Domain.Constants;
using Flowify.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventsCalendar.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public EventsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents(CancellationToken cancellationToken)
        {
            var res = await _mediator.Send(new GetEventsQuery(), cancellationToken);

            return res.ToActionResult(this);
        }

        [HttpGet("range")]
        public async Task<IActionResult> GetEventsByDateRange(
            [FromQuery] DateTime startDate, 
            [FromQuery] DateTime endDate, 
            CancellationToken cancellationToken)
        {
            var res = await _mediator.Send(new GetEventsByDateRangeQuery(startDate, endDate), cancellationToken);

            return res.ToActionResult(this);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetEventById(Guid id, CancellationToken cancellationToken)
        {
            var res = await _mediator.Send(new GetEventByIdQuery(id), cancellationToken);

            return res.ToActionResult(this);
        }

        [Authorize(Roles = Roles.Organizer)]
        [HttpPost]
        public async Task<IActionResult> CreateEvent(
            [FromBody] CreateEventCommand command, 
            CancellationToken cancellationToken)
        {
            var res = await _mediator.Send(command, cancellationToken);

            if (res.IsFailure)
                return res.ToActionResult(this);

            return CreatedAtAction(
                nameof(GetEventById),
                new { id = res.Value!.Id },
                res.Value);
        }

        [Authorize(Roles = Roles.Organizer)]
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateEvent(
            Guid id, 
            [FromBody] UpdateEventCommand command, 
            CancellationToken cancellationToken)
        {
            command = command with { Id = id };

            var res = await _mediator.Send(command, cancellationToken);

            return res.ToActionResult(this);
        }

        [Authorize(Roles = Roles.Organizer)]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteEvent(Guid id, CancellationToken cancellationToken)
        {
            var res = await _mediator.Send(new DeleteEventCommand(id), cancellationToken);

            return res.ToActionResult(this);
        }
    }
}
