// Szerveroldali proxy a Billingo API-hoz.
// A BILLINGO_API_KEY env változót injektálja minden kérésbe,
// így a böngésző soha nem látja a kulcsot.
// Támogatja a JSON és binary (PDF) válaszokat is.

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

  // Path normalizálás
  let path = (event.path || "")
    .replace(/^\/\.netlify\/functions\/billingo/, "")
    .replace(/^\/billingo-api/, "");

  if (!path || path === "/") path = "";
  if (path && !path.startsWith("/")) path = "/" + path;

  // Query string építés
  let queryString = "";
  if (event.rawQuery && event.rawQuery.length > 0) {
    queryString = "?" + event.rawQuery;
  } else if (event.queryStringParameters && typeof event.queryStringParameters === "object") {
    const params = new URLSearchParams();
    for (const key of Object.keys(event.queryStringParameters)) {
      const val = event.queryStringParameters[key];
      if (val != null) params.append(key, val);
    }
    const qs = params.toString();
    if (qs) queryString = "?" + qs;
  }

  const billingoUrl = "https://api.billingo.hu/v3" + path + queryString;

  try {
    const response = await fetch(billingoUrl, {
      method: event.httpMethod,
      headers: {
        "X-API-KEY": apiKey,
        "Accept": "*/*"
      },
      body: ["GET", "HEAD"].includes(event.httpMethod) ? undefined : event.body
    });

    const contentType = response.headers.get("content-type") || "application/json";
    const isText = contentType.includes("json") || contentType.includes("text") || contentType.includes("xml");

    if (isText) {
      const data = await response.text();
      return {
        statusCode: response.status,
        headers: { "Content-Type": contentType },
        body: data
      };
    } else {
      // Binary (PDF, képek stb.) – base64-be kódolva, a böngésző visszafordítja blob-ra
      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      return {
        statusCode: response.status,
        headers: { "Content-Type": contentType },
        body: base64,
        isBase64Encoded: true
      };
    }
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
