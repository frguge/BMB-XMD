const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU5WVVFHR1FXRytLTmduNnJ3OWV4K2RiSWtiWmd1cDd6NWg3dkFGU2FIWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTmRkQnljMEhhYzkxVlFZQlFwcWpjU0FyTnR3dVdtSXBvRHlTYXNlaVB4VT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTlNQNXlEbkFVejNIMzByVWQxeWFlcTBPUnNLVStNUDFCV2ZpajltYkZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXeEd6bWU2RjMwZmxxYWFQdFpSa2pOcmZmS05EdzNPVjhDL2ZkelM2dlQ4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNOSTVCNnJvVXppSmV4SFN2ckF5QjZLdHJaREFsM2p1SUxDRGszTTB5M1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBjWW80Nk84a0xVbnh6ZUwxRHZUeW81akpYbUNTSUlkMnZUYTlGMDg5bWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEFpME1MZmpFSlp2MDFYdHo2MzB4aUtWLzlsaXozaW1PNGMrTnZ6UkJIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQXprR3B6eTBnVGFvL1FadUl3VlFkTU9vRm8zSDdRTXhZUlVkOGw4cTBpTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxsOVB3VlArcVpwYjdTdEg3MEdkdFlQeHRENW00aTQzSkREMEwxVThocmJHbVVjRGg4bUNxQzNYdFlhWWZyZmpMbDIvVFRYNzBIeE4zbDFHUmMyb0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIwLCJhZHZTZWNyZXRLZXkiOiJPZEt6Z2JVZElnYlVkenI5R3JhQ202b2Q5VEJTNW9tTjVEeXNCMkllTTJjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI0MjA2OTI4Mzk2NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUI0NkY3RjU2RjI5MjIyRDU3QyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU1MDQyNDg4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNDIwNjkyODM5NjZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0FENjE4QzREMTAwOEUxMzNGRDYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NTA0MjQ5MX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiUkRQUkg3RlciLCJtZSI6eyJpZCI6IjI0MjA2OTI4Mzk2NjoyN0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjQ1NjI1ODIzNDk0MjUyOjI3QGxpZCIsIm5hbWUiOiLwnZmx8J2ZvPCdmbog8J2Zu/CdmbDwnZm88J2ZtPCdmbvwnZm+IPCfh6jwn4epIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQbk4xczRNRUorbDc4UUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJEY080VTBINmZGVGpkdm1ZSHptQXV3bGR5djc1RG1yQmtGL1g1L0s2ZDEwPSIsImFjY291bnRTaWduYXR1cmUiOiJYR0JvWkZKREJLbXQwWkRzdnNORXlUZnFqeTA0VC92VVRIVkV3NGthSmxUbmxMay9iZkdJYjNFMUFnVGVjMjlRaldoQXZ2aE5ZN2dyR3ZWRkd0SUtoZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoib3VlTWd4MTBSbmZSSzlaRE10OUlENnBwM0pnUlIyemw5MGhFUG56cHJ4bVpqaXl3dHBzVlVyaFJlSzFmbUZFbm1GUkxnVXF5d0RpdGVtd2o3RGpYQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNDIwNjkyODM5NjY6MjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUTNEdUZOQitueFU0M2I1bUI4NWdMc0pYY3IrK1E1cXdaQmYxK2Z5dW5kZCJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTUwNDI0NzcsImxhc3RQcm9wSGFzaCI6IjNnUFVKayIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSWptIn0='
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "BMK",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "242069283966",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

