/*import fs from 'fs'
import os from 'os'

module.exports = ((req: any), (res: any), (next: any)) => {
    const now = Date.now()
    const {url, method} = req
    const data = `${now}: ${method} ${url}`

    fs.appendFile('./src/server.log', data + os.EOL, (err) => {
        if (err) throw err
    } )

    next()
}*/