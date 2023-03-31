import { createClient } from "redis";

const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

client.connect();

client.on("connect", () => {
  console.log("redis connected");
});

export default client;
