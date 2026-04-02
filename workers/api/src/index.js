export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({
        ok: true,
        service: "web3-learn-api",
        time: new Date().toISOString(),
      });
    }

    if (url.pathname === "/api/hello") {
      return Response.json({
        message: "Hello from a Workers-only service",
        method: request.method,
        path: url.pathname,
      });
    }

    return new Response("Not found", { status: 404 });
  },
};
