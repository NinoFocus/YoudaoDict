#!/usr/bin/env babel-node

import Dict from './lib/dict'
import print from './lib/print'

let q = process.argv.slice(2).join(' ')
let dict = new Dict(q)

dict.query().then((data) => {
    print(data)
}).catch((msg) => {
    console.error(msg)
})
