import { createClient } from "@libsql/client";

const tursoCityCubeClient = createClient({
  url: process.env.LIBSQL_CONN,
  authToken: process.env.TURSO_DB_API_TOKEN,
});

export default tursoCityCubeClient;
