using EventsCalendar.Application.Common.Results;
using FluentValidation.Results;

namespace EventsCalendar.Application.Common.Validators
{
    public static class ValidationResultExtensions
    {
        public static Error ToError(this ValidationResult validationResult)
        {
            return new Error(
                "Validation.Failed",
                string.Join("; ", validationResult.Errors.Select(e => e.ErrorMessage)));
        }
    }
}
