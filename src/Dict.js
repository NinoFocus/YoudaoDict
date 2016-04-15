import http from 'http'

class Dict {
  constructor(q = '') {
    this.q = encodeURIComponent(q)
    this.keyfrom = 'Nino-Tips'
    this.key = '1127122345'

    this.url = `http://fanyi.youdao.com/openapi.do?keyfrom=${this.keyfrom}&key=${this.key}&type=data&doctype=json&version=1.1&q=${this.q}`
  }

  query() {
    return new Promise((resolve, reject) => {
      http.get(this.url, (res) => {
        res.setEncoding('utf-8')
        res.on('data', (data) => {
          resolve(data);
        })
      }).on('error', (err) => {
        reject(err);
      })
    });
  }
}

export default Dict
