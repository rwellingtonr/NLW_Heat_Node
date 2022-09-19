import { serverHttp } from "./app";

const { PORT } = process.env;

serverHttp.listen(PORT, () => {
  console.log(`hello, listen to port: ${PORT}`);
});
