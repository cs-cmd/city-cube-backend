import cityCubeDb from '#clients/tursoCityCubeClient.js';

const apiMenuItemsGet = async (req, res) => {
    const menuItems = await cityCubeDb.getAllMenuItems();

    res.json(menuItems);
}

export {
    apiMenuItemsGet,
}