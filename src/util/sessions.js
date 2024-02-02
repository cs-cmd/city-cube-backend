import sqlite from 'better-sqlite3';
import session from 'express-sesson';
import * as sessionStore from 'better-sqlite3-session-store';

const SqlliteStore = sessionStore(session);
const db = new sqlite('sessions.db', {verbose: console.log});

const appSession = session({
    store: new SqlliteStore({
        client: db,
        expired: {
            clear: true,
            intervalMs: 900000
        }
    }),
    secret: 'keyboard cat',
    resave: false,
});

export default appSession;