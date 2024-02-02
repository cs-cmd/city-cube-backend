import sessions from '#util/sessions.js';

const logoutPost = (req, res, next) => {
    sessions.removeSession(req.cookies['session-id']);   
    res.clearCookie('session-id');
    res.redirect('/login');
}

export {
    logoutPost,
}