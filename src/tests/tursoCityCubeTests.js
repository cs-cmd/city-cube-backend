import cityCubeDb from '#clients/tursoCityCubeClient.js';

async function testGetAll() {
  console.log('testGetAll results:');
  const menuItems = await cityCubeDb.getAllMenuItems();
  console.log(menuItems);
}

async function testGetItem() {
  console.log("testGetItem results");
  const menuItem = await cityCubeDb.getMenuItem(1)
  console.log(menuItem);
}

async function testAddMenuItem() {
  const newItem = {
    name: 'TEST',
    price: '0',
    description: 'TEST ITEM',
    amount_in_stock: 0,
  };

  const result = await cityCubeDb.addMenuItem(newItem);

  console.log(result);
};

async function updateMenuItemTest() {
  const itemId = 7;
  const newItem = {
    name: 'TEST 5',
    price: 15,
    amount_in_stock: 100,
  }
  
  const wasSuccessful = await cityCubeDb.updateMenuItem(itemId, newItem);

  console.log("updateMenuItem test passed: ", wasSuccessful);
}


// await testGetAll(); - works
// await testGetItem(); - works
// await testAddMenuItem(); - works
await updateMenuItemTest();
