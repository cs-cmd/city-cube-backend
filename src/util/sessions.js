import { v5 } from 'uuid';

const NS = '9554bd05-6417-431e-a8f8-7b2ed6c69898';

const sessions = (() => {
    const activeSessions = {};

    const addSession = async(user) => {
        const sessionId = v5(user.email, NS);

        if (activeSessions[sessionId] != null) {
            // sessionId already in use;
        }

        activeSessions[sessionId] = user;

        return sessionId;
    }

    const removeSession = async(sessionId) => {
        delete activeSessions[sessionId];
    }

    const getSessionUser = async(sessionId) => activeSessions[sessionId];


    const isValidSession = async(sessionId) => activeSessions[sessionId] != null;

    return {
        addSession,
        removeSession,
        getSessionUser,
        isValidSession
    }
})();

export default sessions;
