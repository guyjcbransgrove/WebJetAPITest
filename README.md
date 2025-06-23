# WebJetAPITest

## Running the application

If I had more time I would love to set up docker files and a docker compose for the front and back end of the application. In absence of that please run the following commands to stand up the development version.

In terminal 1 do the following:

cd webjetapitest-fe

npm install

npm run dev

In terminal 2 do the following:

cd WebJetAPITest

dotnet run --lauch-profile "https"

In browser navigate to http://localhost:5173/ and begin using the application

## Approach

Given that we are trying to display data to the users via multiple provider APIs I've formulated a couple of primary concerns that I would like to address with the solution:

1. External providers are potentially unstable.
2. To provide all of the information from every provider at once to the user would essentially force displaying content at the rate of the least performant provider.
3. We will likely need to implement retrying provider API calls in the back end to enhance stability beyond provider stability levels
4. Retries mean increased latency for our users

To address these concerns I will do a few things with the solution:

1. Implement incrementally loading the data in the front end (provider by provider)
2. Segregate requests to the back end per provider
3. Concurrently handle provider requests on the front end so that the first to return renders data on the page

With this implmeeented the user should have a much more reliable experience than any of the individual APIs provide, with the time to interactivity effectively being the speed of the *most* performant provider, not the least.

## Solution

Initially on the front end I built out the relevant components and state using mocked API calls just using promises and a randomised timeout. This way I could see that as each promise resolved (or randomly rejected) that data was being rendered on the page incrementally.

I was able to reuse a hook to handle the loading functionality of each API call, and I used the requests themselves in state so that I could await them via Promise.any() which resolves the returned promise as soon as any promise provided in the array resolves. This is how it achieves incrementally loading data on the page as data comes in.

On the backend I created a quick console project that just ran API calls repeatedly so that I could make descions around API call retries with data in mind. With this I created a couple of typed HTTPClients with Polly retry policies attached so that I could confidentally call to the providr API.

I implemented two endpoints, each taking a provider ID to determine which mediatr request handler to logically route to. These more or less just make the request to the correct endpoint and return the content in the format that fits our response model.

Ideally I would like to go through the back end and front end and add tests but I've prioritised getting a manually tested working version as I've only had time late in the evenings to put this together and I can't dedicate more time to it with my current obligations. If this was the wrong call and you would like to see how I'd go about adding tests to this repository please let me know and I can update it to include them.