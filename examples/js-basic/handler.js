/**
 * Builds a reply to the given request
 */
const reply = (request) => {
  if (request.method != "GET") {
    // Don't allow other methods.
    // Here you can see how to return a custom status
    return new Response("Method not allowed", {
      status: 405
    });
  }

  // Body response
  const body = `<!DOCTYPE html>
<body>
  <h1>Hello from Wasm Workers Server</h1>
  <p>Replying to ${request.url}</p>
  <p>Method: ${request.method}</p>
  <p>User Agent: ${request.headers.get("userAgent")}</p>
  <p>Payload: ${request.body || "-"}</p>
  <p>
    This page was generated by a JavaScript file inside WebAssembly
  </p>
</body>`;

  // Build a new response
  let response = new Response(body);

  // Add a new header
  response.headers.set("x-generated-by", "wasm-workers-server");

  return response;
}

// Subscribe to the Fetch event
addEventListener("fetch", event => {
  return event.respondWith(reply(event.request));
});
