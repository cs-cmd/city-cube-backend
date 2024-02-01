import { Strategy } from "passport";
import testUserItemsDb from "#data-stores/testUserItemsDb";

const LocalStrategy = new Strategy(async (email, password, done) => {
    try {
        const user = testUserItemsDb.getUser(email);

        if(!user) {
            return done(null, false, {message: 'Incorrect username'});
        } else if (user.password !== password) {
            return done(null, false, {message: 'Incorrect password'});
        }
        return done(null, user);
    } catch(err) {
        return done(err);
    }
})