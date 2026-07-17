using EventsCalendar.Application.Common.Results;
using Microsoft.AspNetCore.Mvc;

namespace EventsCalendar.Api.Extensions
{
    public static class ResultExtensions
    {
        public static IActionResult ToActionResult<T>(
            this Result<T> result,
            ControllerBase controller)
        {
            if (result.IsSuccess)
                return controller.Ok(result.Value);

            return result.Error!.ToErrorResult(controller);
        }

        public static IActionResult ToActionResult(
            this Result result,
            ControllerBase controller)
        {
            if (result.IsSuccess)
                return controller.NoContent();

            return result.Error!.ToErrorResult(controller);
        }

        private static IActionResult ToErrorResult(
            this Error error,
            ControllerBase controller)
        {
            return error.Code switch
            {
                var code when code.Contains("NotFound") =>
                    controller.NotFound(error),

                var code when code.Contains("Unauthorized") =>
                    controller.Unauthorized(error),

                var code when code.Contains("Forbidden") =>
                    controller.Forbid(),

                var code when code.Contains("AlreadyExists") =>
                    controller.Conflict(error),

                var code when code.Contains("Invalid") =>
                    controller.BadRequest(error),

                _ => controller.BadRequest(error)
            };
        }
    }
}
