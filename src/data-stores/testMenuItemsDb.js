const testMenuItemsDb = (() => {
  const testMenuItems = [
    {
      item_id: 0,
      name: "block",
      price: 20,
      description: "test",
      amount_in_stock: 100,
    },
    {
      item_id: 1,
      name: "cube",
      price: 10,
      description: "test",
      amount_in_stock: 100,
    },
  ];

  

  let nextInsert = 2;

  const getItem = (id) => {
    for (let i = 0; i < testMenuItems.length; i++) {
      if (testMenuItems[i].item_id == id) {
        return testMenuItems[i];
      }
    }
    return null;
  };

  const addItem = (newItem) => {
    const dbItem = {
      ...newItem,
      item_id: nextInsert++,
    };
    testMenuItems.push(dbItem);
  };

  const removeItem = (id) => {
    for (let i = 0; i < testMenuItems.length; i++) {
      if (testMenuItems[i].item_id == id) {
        testMenuItems.splice(i, 1);
        return true;
      }
    }
    return false;
  };

  const updateItem = (updatedItem) => {
    for (let i = 0; i < testMenuItems.length; i++) {
      if (testMenuItems[i].item_id == updatedItem.item_id) {
        testMenuItems[i].name = updatedItem.name;
        testMenuItems[i].price = updatedItem.price;
        testMenuItems[i].description = updatedItem.description;
        testMenuItems[i].amount_in_stock = updatedItem.amount_in_stock;
      }
    }
  };

  const getItems = () => testMenuItems;

  const confirmAction = (password) => {
    if (adminPasswords.includes(password)) {
      return true;
    }
    return false;
  };

  return {
    addItem,
    removeItem,
    updateItem,
    getItems,
    getItem,
    confirmAction,
  };
})();

export default testMenuItemsDb;
