import Dict from './Dict'
import print from './print'

const q = process.argv.slice(2).join(' ')

const dict = new Dict(q)

dict.query().then((data) => {
  print(data)
}).catch((msg) => {
  console.error(msg)
})
