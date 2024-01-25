import { createClient } from "@libsql/client";

const cityCubeDb = (() => {
  const tursoCityCubeClient = createClient({
    url: process.env.LIBSQL_CONN,
    authToken: process.env.TURSO_DB_API_TOKEN,
  });

  const getAllMenuItems = async () => {
    const menuItems = await tursoCityCubeClient.execute(
      "select * from menu_items",
    );
    return menuItems;
  };

  return {
    getAllMenuItems,
  };
})();

export default cityCubeDb;
