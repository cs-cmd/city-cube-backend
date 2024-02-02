import testMenuItemsDb from '#data-stores/testMenuItemsDb.js';

const apiMenuItemsGet = async (req, res) => {
    const menuItems = await testMenuItemsDb.getItems();

    res.json(menuItems);
}

export {
    apiMenuItemsGet,
}