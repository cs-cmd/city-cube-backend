import testMenuItemsDb from '#data-stores/testMenuItemsDb.js';

const apiMenuItemsGet = async (req, res) => {
    console.log('api menu items get');
    const menuItems = await testMenuItemsDb.getItems();

    res.json(menuItems);
}

export {
    apiMenuItemsGet,
}