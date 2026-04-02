import { buildSchema, graphql } from "graphql";

const schema = buildSchema(`
  type Query {
    health: Health!
    hello(name: String): String!
  }

  type Health {
    ok: Boolean!
    service: String!
    time: String!
  }
`);

const rootValue = {
  health: () => ({
    ok: true,
    service: "web3-learn-api",
    time: new Date().toISOString(),
  }),
  hello: ({ name }) => `Hello, ${name || "world"} from Cloudflare Workers GraphQL`,
};

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init.headers,
    },
  });
}

async function handleGraphQL(request) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, POST, OPTIONS",
        "access-control-allow-headers": "content-type",
      },
    });
  }

  if (request.method === "GET") {
    return json({
      message: "GraphQL endpoint ready",
      endpoint: "/graphql",
      exampleQuery: "{ hello(name: \"Cloudflare\") health { ok service time } }",
    }, {
      headers: {
        "access-control-allow-origin": "*",
      },
    });
  }

  if (request.method !== "POST") {
    return json(
      { errors: [{ message: "Method not allowed" }] },
      {
        status: 405,
        headers: {
          "access-control-allow-origin": "*",
        },
      },
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return json(
      { errors: [{ message: "Invalid JSON body" }] },
      {
        status: 400,
        headers: {
          "access-control-allow-origin": "*",
        },
      },
    );
  }

  const result = await graphql({
    schema,
    source: body.query || "",
    rootValue,
    variableValues: body.variables,
    operationName: body.operationName,
  });

  return json(result, {
    status: result.errors ? 400 : 200,
    headers: {
      "access-control-allow-origin": "*",
    },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return json({
        ok: true,
        service: "web3-learn-api",
        time: new Date().toISOString(),
      });
    }

    if (url.pathname === "/graphql") {
      return handleGraphQL(request);
    }

    return new Response("Not found", { status: 404 });
  },
};
