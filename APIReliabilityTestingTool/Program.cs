// See https://aka.ms/new-console-template for more information
using System.Diagnostics;

Console.WriteLine("Please provide your WebJetAPITest API Key:");
var APIKey = Console.ReadLine();

string? provider;
string[] acceptableProviders = ["filmworld", "cinemaworld"];
do
{
    Console.WriteLine("Please provide your chosen provider: (filmworld, cinemaworld)");
    provider = Console.ReadLine();
} while (!acceptableProviders.Contains(provider));

var cancellationTokenSource = new CancellationTokenSource();
var httpClient = new HttpClient();
httpClient.BaseAddress = new("https://webjetapitest.azurewebsites.net/api/");
httpClient.DefaultRequestHeaders.Add("x-access-token", APIKey);
var failedRequests = 0;
var successfulRequests = 0;
var stopWatch = Stopwatch.StartNew();
while (true)
{
    stopWatch.Restart();
    try
    {
        var response = await httpClient.GetAsync($"{provider}/movies", cancellationTokenSource.Token);
        Console.WriteLine(response.StatusCode);
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Console.WriteLine(content);
        successfulRequests++;
    } 
    catch
    {
        failedRequests++;
    }
    finally
    {
        Console.WriteLine($"Time taken: {stopWatch.Elapsed.ToString()}");
        Console.WriteLine($"Successful Requests: {successfulRequests} Failed Requests: {failedRequests}");
    }
}