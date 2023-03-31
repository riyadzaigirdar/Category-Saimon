import { promisify } from "util";
import { createClient } from "redis";

let options: any = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
};

// check if redis is password protected
if (process.env.REDIS_PASSWORD) {
  options["password"] = process.env.REDIS_PASSWORD;
}

const client = createClient(options);

client.connect();

client.on("connect", () => {
  console.log("redis connected");
});

export default client;
