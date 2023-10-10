const cors_proxy = require("cors-anywhere");

const host = "localhost";
const port = 8081;
cors_proxy
  .createServer({
    originWhitelist: [],
  })
  .listen(port, host, () => {
    console.log(`CORS Anywhere server running on ${host}:${port}`);
  });
