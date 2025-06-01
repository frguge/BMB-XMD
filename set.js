const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU1sZzEzSjBzZHZwSVVsMkZtRDVkNDVoOTc5SHVPSFpXY2txSTJzV3pGVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkpGNW1oZ1pYS0hZWUZLcUY1WGFFcm5mRGpBUTRrTmZVb2s4QXpHN1pFYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyS3R6ZGRRM0YyaENjZ2xJTjcyQmlEQzczTUJNVDdjWWlmSXdWcXFTK1V3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4YnNxUUJrT1piUmUxbkJsR1BFRTgvcjlJV09ORlFqTzFraHRJL0RnTFhFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNPNkMwR1h5VHFVRzc1Q3FSTTlwNElBUTRZaFhvalRaTHY5ZitKck9VVlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllKK2ZsN2dXWE90TkRkaVFoaE05LzNvZXUrdEw5eXRzYTBZVTMvcSt3bjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0Z4YXdZTnJYNTg4L2dlRnVjcG9JNUVsUk83bzlXWTN3S2dkd0tVZWluST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid2VuT2UwcGRUbE9va3N5UDZHRlluWGx0dEtuQ3NERFdraG9vMXV5TEhpQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9tanhoSFVHUE56N3RPREdNbzRRbkVvY0dMMzB5WEdMbC80THVUUWs0QUdPNllnNUFmdkhHMzN0OG4rQnV3NW53VzhocHEreEhZUHpOR1JJSFdxbWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU4LCJhZHZTZWNyZXRLZXkiOiJDdGkwMHR3K2h1b0QwaGRnK1Z4cFJwZExLTk9TNW50TmRoMDVra0lBaFU0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY5MzI1MzY5OUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDNkI2MzY4RDZFNzQ3N0M5NzFCMUYwNUExMzczNEUyRCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4Nzc3NjA4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2OTMyNTM2OTlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQ0RFNjQxNjQ5RkExQzQxQzc1NkIyNkU2QTJDMDQ0QTQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0ODc3NzYwOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NjkzMjUzNjk5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijg4MTVCOEI1NjFERUM0MTAzRjkzNkY4Q0ZBRDJDRjc3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDg3Nzc2MTJ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjJCOTQzQlFLIiwibWUiOnsiaWQiOiIyNTU2OTMyNTM2OTk6MTNAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyMDk1NTM5NzEyODI2NzoxM0BsaWQiLCJuYW1lIjoi7KGw7IWJIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQcUV5alVROS9Ud3dRWVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJxSm9KMEF0YnhKMk0wdkRmMmxXeEREQ05SUmZraFV6NmdSaFFsUW9RU0g4PSIsImFjY291bnRTaWduYXR1cmUiOiJxd2c0MVhpdlB0ekJrcnJ3ZnFUU01lVks0QnVrajlxVnpadnp0UUhjY1BtUUhneEljZGVGQm8xaEtZZHJOdmZPV3JxbThadUZVREdSSHd5VXg0dFZCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUW8rcGZNZEhudXZRZGI4ajd6RHBxSXZpSjR2M3o3T2c3eTVhV0Jna054MXRsY2JQYy95Uys5RU9mTWpMTnRJNGVJZk9kSys5ZUVvL0xrODJwWUhuaWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2OTMyNTM2OTk6MTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYWlhQ2RBTFc4U2RqTkx3MzlwVnNRd3dqVVVYNUlWTStvRVlVSlVLRUVoLyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4Nzc3NjA0LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhuTyJ9',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
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

