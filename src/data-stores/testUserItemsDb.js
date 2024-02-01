import bcrypt from 'bcryptjs';

const testUserItemsDb = (() => {
  const testUsers = [];

  const dummyUsers = [
    {
        email: 'admin@citycube.io',
        password: 'admin',
        type: 'admin'
    }, 
    {
        email: 'user@city-mainframe.io',
        password: 'user',
        type: 'user'
    }
  ];

  for(let i = 0; i < dummyUsers.length; i++) {
    const { email, password, type } = dummyUsers[i];
    addUser(email, password, type);
  }

  const checkIfUser = async (email) => {
    for (let i = 0; i < testUsers.length; i++) {
      if (testUsers[i].email == email) {
        return true;
      }
    }
    return false;
  };
  const checkUserPassword = async (email, password) => {
    for (let i = 0; i < testUsers.length; i++) {
      if (testUsers[i].email == email && testUsers[i].password == password) {
        return true;
      }
    }
    return false;
  };

  const getUser = (email) => {
    for (let i = 0; i < testUsers.length; i++) {
      if (testUsers[i].email == email) {
        return {
          email: testUsers[i].email,
          type: testUsers[i].type,
          user_id: testUsers[i].user_id,
        };
      }
      return null;
    }
  };

  const addUser = (email, password, type) => {
    bcrypt.hash(password, 10, async(err, hashedPassword) => {
        if(!err) {
            // error
            return err;
        }

        const newUser = {
            email, 
            password: hashedPassword,
            type
        };

        testUsers.push(newUser);

        return null;
    })
  }

  const adminPasswords = ["helpme123", "badpassword"];

  return {
    checkIfUser,
    checkUserPassword,
    getUser,
    addUser,
  }

})();

export default testUserItemsDb;