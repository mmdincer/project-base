module.exports = {
    "PORT": process.env.PORT || "3000",
    "LOG_LEVEL" : process.env.LOG_LEVEL || "debug",
    "CONNECTION_STRING" : process.env.CONNECTION_STRING || "mongodb://localhost:27017/project_base",
    "JWT" : {
        "SECRET" : process.env.JWT_SECRET || "adlfkaksdhkjhKJSGdjJHEGfahJGASHFgASJhfg873w46sdugfeuy3w478tsdfgasejrky893auajsdgAYS&jwehj3kdha8))9wnrknqnl3ldkehsegfsjdvjrlvjkrjgldfmbldg",
        "EXPIRE_TIME" : !isNaN(parseInt(process.env.TOKEN_EXPIRE_TIME)) ? parseInt(process.env.TOKEN_EXPIRE_TIME) : 24*60*60
    },
    "FILE_UPLOAD_PATH": process.env.FILE_UPLOAD_PATH,
    "DEFAULT_LANG": process.env.DEFAULT_LANG || "EN"

}