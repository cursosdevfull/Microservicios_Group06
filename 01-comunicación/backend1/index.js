const http = require("http");
const app = require("./app");
const port = process.env.PORT || 19010;

const server = http.createServer(app);

server
  .listen(port)
  .on("listening", () =>
    console.log(`Servidor escuchando en el puerto ${port}`)
  )
  .on("error", (err) => console.log(err));
