import { Strategy } from "passport-local";
import testUserItemsDb from "#data-stores/testUserItemsDb.js";

const LocalStrategy = Strategy;

const localStrategy = new LocalStrategy(async (email, password, done) => {
    console.log('passport authenticate');
    try {
        const user = await testUserItemsDb.getUser(email);
        console.log(user);
        console.log(email);

        if(!user) {
            return done(null, false, {message: 'Incorrect username'});
        } else if (user.password !== password) {
            return done(null, false, {message: 'Incorrect password'});
        }
        return done(null, user);
    } catch(err) {
        return done(err);
    }
});

const serailizeUser = (user, done) => {
    done(null, user.email);
}

const deserializeUser = async (email, done) => {
    try {
        const user = await testUserItemsDb.getUser(email);
        done(null, user);
    } catch(err) {
        done(err);
    };
};

export { localStrategy, serailizeUser, deserializeUser }
export default LocalStrategy;