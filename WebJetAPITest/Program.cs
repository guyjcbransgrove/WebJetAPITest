using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.Extensions.Http;
using System.Reflection;
using WebJetAPITest.API.RequestHandlers.HttpClients;

static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
{
    return HttpPolicyExtensions
        .HandleTransientHttpError()
        .WaitAndRetryAsync(5, attemptCount => TimeSpan.FromSeconds(Math.Pow(2, attemptCount)));
}

var builder = WebApplication.CreateBuilder(args);

/* this appsettings file is in the gitignore
{
    "ApiKey": "YOUR_API_KEY_HERE"
}
 */
builder.Configuration.AddJsonFile("appsettings.secret.json");

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient<ICinemaworldClient, CinemaworldClient>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["CinemaworldBaseAddress"]);
    client.DefaultRequestHeaders.Add("x-access-token", builder.Configuration["ApiKey"]);
    client.Timeout = TimeSpan.FromSeconds(20);
}).AddPolicyHandler(GetRetryPolicy());

builder.Services.AddHttpClient<IFilmworldClient, FilmworldClient>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["FilmworldBaseAddress"]);
    client.DefaultRequestHeaders.Add("x-access-token", builder.Configuration["ApiKey"]);
    client.Timeout = TimeSpan.FromSeconds(20);
}).AddPolicyHandler(GetRetryPolicy());

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowFrontEnd",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173");
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontEnd");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
