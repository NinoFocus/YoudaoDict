'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var http = _interopDefault(require('http'));

class Dict {
  constructor(q = '') {
    this.q = encodeURIComponent(q);
    this.keyfrom = 'Nino-Tips';
    this.key = '1127122345';

    this.url = `http://fanyi.youdao.com/openapi.do?keyfrom=${this.keyfrom}&key=${this.key}&type=data&doctype=json&version=1.1&q=${this.q}`;
  }

  query() {
    return new Promise((resolve, reject) => {
      http.get(this.url, (res) => {
        res.setEncoding('utf-8');
        res.on('data', (data) => {
          resolve(data);
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  }
}

function __(title, pad = '-', len = 30) {
  const length = len - 2 - title.length;
  if (length > 0) {
    const leftPad = pad.repeat(Math.ceil(length / 2));
    const rightPad = pad.repeat(Math.floor(length / 2));
    console.log(`\x1b[0m${leftPad} ${title} ${rightPad}`);
  } else {
    console.log(title);
  }
}


function parseWebTrans(data) {
  const web = data.web || [];
  if (web.length) {
    console.log();
    __('Network', '=');
    for (let i = 0, l = web.length; i < l; i++) {
      __(web[i].key);
      for (let j = 0; j < web[i].value.length; j++) {
        console.log(' ', web[i].value[j]);
      }
    }
  }
}

function parsePhoneticSymbol(data) {
  const phonetic = (data.basic || {}).phonetic;
  if (phonetic) {
    console.log(` ${data.translation.join(' ')} \x1b[32m[${data.basic.phonetic}]`);
  } else {
    console.log(' ', data.translation.join(' '));
  }
}

function parseDictTrans(data = {}) {
  const explains = (data.basic || {}).explains || [];
  if (explains.length) {
    console.log('\x1b[0');
    __('YouDao Dict', '=');
    for (let i = 0, l = explains.length; i < l; i++) {
      console.log('\x1b[33m ', explains[i]);
    }
  }
}

function parse(data) {
  if (data.errorCode !== 0) {
    console.log({
      20: '要翻译的文本过长',
      30: '无法进行有效的翻译',
      40: '不支持的语言类型',
      50: '无效的key',
      60: '无词典结果，仅在获取词典结果生效',
    }[data.errorCode]);
    return
  }
  parsePhoneticSymbol(data);
  parseDictTrans(data);
  parseWebTrans(data);
}

function print(data) {
  const json = JSON.parse(data);
  parse(json);
}

const q = process.argv.slice(2).join(' ');

const dict = new Dict(q);

dict.query().then((data) => {
  print(data);
}).catch((msg) => {
  console.error(msg);
});
