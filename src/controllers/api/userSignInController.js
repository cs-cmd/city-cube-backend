import testUserItemsDb from '#data-stores/testUserItemsDb.js';

const signUserIn = async(req, res, next) => {
    const userId = await testUserItemsDb.getUser(res.body.email);

    if(!userId) {
        res.status(400);
    }

    
}