using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace WebJetAPITest.API
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            if (exception is ProviderNotFoundException)
            {
                var problemDetails = new ProblemDetails
                {
                    Title = "An unrecognised provider could not be found",
                    Status = StatusCodes.Status400BadRequest
                };

                httpContext.Response.StatusCode = problemDetails.Status.Value;

                await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

                return true;
            }

            var genericProblemDetails = new ProblemDetails
            {
                Title = "An unknown error ocurred",
                Status = StatusCodes.Status500InternalServerError
            };

            httpContext.Response.StatusCode = genericProblemDetails.Status.Value;

            await httpContext.Response.WriteAsJsonAsync(genericProblemDetails, cancellationToken);

            return true;
        }
    }
}
