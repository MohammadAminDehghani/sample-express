const database = require('./database')
const service = require('./service')
const session = require('./session')


module.exports = {
    database,
    service,
    session,
    debug : true,
    jwt : {
        secretKey : 'nhd@sd3budsb&^^%$hgdvyst#@av7s'
    }
}