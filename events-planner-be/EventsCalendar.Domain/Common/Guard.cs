namespace EventsCalendar.Domain.Common
{	public static class Guard
	{
		public static void AgainstNullOrWhiteSpace(string value, string paramName)
		{
			if (string.IsNullOrWhiteSpace(value))
				throw new ArgumentException($"{paramName} is required", paramName);
		}
	}
}
