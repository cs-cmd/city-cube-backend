import cityCubeDb from '#clients/tursoCityCubeClient.js';
import { sanitize } from '#util/sanitization.js';

const signUserIn = 
async(req, res, next) => {
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);

    if(!email || !password) {
        res.status(400);
        return;
    }

    const signInRes = await cityCubeDb.userSignIn(email, password);

    res.status(signInRes.statusCode);

    if(signInRes.statusCode != 200) {
        res.message(signInRes.msg);
    } else {
        res.cookie('Session-Id', signInRes.sessionId, {
            secure: true,
            httpOnly: true,
        });
        res.cookie('User-Id', signInRes.userId, {
            secure: true,
            httpOnly: true
        });
    }
}

export { signUserIn };