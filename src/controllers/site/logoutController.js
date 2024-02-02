const logoutPost = (req, res, next) => {
    // log user out
    res.redirect('/login');
}

export {
    logoutPost,
}