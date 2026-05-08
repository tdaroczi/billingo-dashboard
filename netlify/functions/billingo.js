// Szerveroldali proxy a Billingo API-hoz.
// A BILLINGO_API_KEY env változót injektálja minden kérésbe,
// így a böngésző soha nem látja a kulcsot.

exports.handler = async (event) => {
  const apiKey = process.env.BILLINGO_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "BILLINGO_API_KEY environment variable not set",
        hint: "Netlify → Site settings → Environment variables → Add BILLINGO_API_KEY"
      })
    };
  }

  // Path normalizálás:
  // /.netlify/functions/billingo/documents → /documents
  // /billingo-api/documents → /documents
  let path = event.path
    .replace(/^\/\.netlify\/functions\/billingo/, "")
    .replace(/^\/billingo-api/, "");

  if (!path || path === "/") path = "";
  if (path && !path.startsWith("/")) path = "/" + path;

  const queryString = event.rawQuery
    || (event.queryStringParameters && Object.keys(event.queryStringParameters).length > 0
        ? "?" + new URLSearchParams(event.queryStringParameters).toString()
        : "");

  const billingoUrl = `https://api.billingo.hu/v3${path}${queryString}`;

  try {
    const response = await fetch(billingoUrl, {
      method: event.httpMethod,
      headers: {
        "X-API-KEY": apiKey,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: ["GET", "HEAD"].includes(event.httpMethod) ? undefined : event.body
    });

    const data = await response.text();

    return {
      statusCode: response.status,
      headers: { "Content-Type": "application/json" },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to reach Billingo API",
        details: error.message
      })
    };
  }
};
