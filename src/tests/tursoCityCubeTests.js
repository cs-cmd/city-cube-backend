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

async function deleteMenuItemTest() {
  const itemId = 7;

  const wasSuccessful = await cityCubeDb.deleteMenuItem(itemId);

  console.log(wasSuccessful);
}

// await testGetAll(); - works
// await testGetItem(); - works
// await testAddMenuItem(); - works
// await updateMenuItemTest(); - works
// await deleteMenuItemTest(); - works

// all menu_items tests pass

async function isValidUserTest() {
  const isValidUser = cityCubeDb.isValidUser("hello@world.com");
  console.log('is valid user: hello@world.com:', isValidUser);
}

async function addUserTest() {
 
  const email = 'hello@world.com';
  const password = 'hello';
  const type = 'admin';

  const result = await cityCubeDb.addUser(email, password, type);

  console.log(result);
}

// await addUserTest(); // - passed
await isValidUserTest();
