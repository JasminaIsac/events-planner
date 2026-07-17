
using EventsCalendar.Infrastructure.Authentication;
using Microsoft.Extensions.Configuration;
using FluentAssertions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace EventsCalendar.UnitTests.Infrastructure.Authentication
{
    public class JwtTokenServiceTests
    {
        [Fact]
        public void GenerateAccessToken_ShouldContainExpectedClaims()
        {
            var configuration = CreateConfiguration();
            var service = new JwtTokenService(configuration);

            var userId = Guid.NewGuid();
            var email = "john@example.com";
            var roles = new[] { "Admin", "Organizer" };

            var token = service.GenerateAccessToken(userId, email, roles);

            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.ReadJwtToken(token);

            jwt.Issuer.Should().Be("test-issuer");
            jwt.Audiences.Should().Contain("test-audience");

            jwt.Claims.Should().Contain(c =>
                c.Type == ClaimTypes.NameIdentifier &&
                c.Value == userId.ToString());

            jwt.Claims.Should().Contain(c =>
                c.Type == JwtRegisteredClaimNames.Email &&
                c.Value == email);

            jwt.Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value)
                .Should()
                .BeEquivalentTo(roles);
        }

        [Fact]
        public void GenerateRefreshToken_ShouldReturnNonEmptyRandomToken()
        {
            var service = new JwtTokenService(CreateConfiguration());

            var firstToken = service.GenerateRefreshToken();
            var secondToken = service.GenerateRefreshToken();

            firstToken.Should().NotBeNullOrWhiteSpace();
            secondToken.Should().NotBeNullOrWhiteSpace();

            firstToken.Should().NotBe(secondToken);
        }

        private static IConfiguration CreateConfiguration()
        {
            var values = new Dictionary<string, string?>
            {
                ["Jwt:Issuer"] = "test-issuer",
                ["Jwt:Audience"] = "test-audience",
                ["Jwt:Key"] = "this-is-a-very-long-test-secret-key-for-jwt"
            };

            return new ConfigurationBuilder()
                .AddInMemoryCollection(values)
                .Build();
        }
    }
}
