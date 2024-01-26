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

  const deleteMenuItem = async (id) => {
    // potential issue here with users passing in malicious code; refactor
    // sanitize data, since this could be user provided
    await tursoCityCubeClient.execute(
      `delete from menu_items where id = ${id}`,
    );
  };

  return {
    getAllMenuItems,
  };
})();

export default cityCubeDb;
