'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var http = _interopDefault(require('http'));

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Dict = function () {
  function Dict() {
    var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    classCallCheck(this, Dict);

    this.q = encodeURIComponent(q);
    this.keyfrom = 'Nino-Tips';
    this.key = '1127122345';

    this.url = 'http://fanyi.youdao.com/openapi.do?keyfrom=' + this.keyfrom + '&key=' + this.key + '&type=data&doctype=json&version=1.1&q=' + this.q;
  }

  createClass(Dict, [{
    key: 'query',
    value: function query() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        http.get(_this.url, function (res) {
          res.setEncoding('utf-8');
          res.on('data', function (data) {
            resolve(data);
          });
        }).on('error', function (err) {
          reject(err);
        });
      });
    }
  }]);
  return Dict;
}();

function __(title) {
  var pad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  var len = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;

  var length = len - 2 - title.length;
  if (length > 0) {
    var leftPad = pad.repeat(Math.ceil(length / 2));
    var rightPad = pad.repeat(Math.floor(length / 2));
    console.log('\x1B[0m' + leftPad + ' ' + title + ' ' + rightPad);
  } else {
    console.log(title);
  }
}

function parseWebTrans(data) {
  var web = data.web || [];
  if (web.length) {
    console.log();
    __('Network', '=');
    for (var i = 0, l = web.length; i < l; i++) {
      __(web[i].key);
      for (var j = 0; j < web[i].value.length; j++) {
        console.log(' ', web[i].value[j]);
      }
    }
  }
}

function parsePhoneticSymbol(data) {
  var phonetic = (data.basic || {}).phonetic;
  if (phonetic) {
    console.log(' ' + data.translation.join(' ') + ' \x1B[32m[' + data.basic.phonetic + ']');
  } else {
    console.log(' ', data.translation.join(' '));
  }
}

function parseDictTrans() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var explains = (data.basic || {}).explains || [];
  if (explains.length) {
    console.log('\x1b[0');
    __('YouDao Dict', '=');
    for (var i = 0, l = explains.length; i < l; i++) {
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
      60: '无词典结果，仅在获取词典结果生效'
    }[data.errorCode]);
    return;
  }
  parsePhoneticSymbol(data);
  parseDictTrans(data);
  parseWebTrans(data);
}

function print(data) {
  var json = JSON.parse(data);
  parse(json);
}

var q = process.argv.slice(2).join(' ');

var dict = new Dict(q);

dict.query().then(function (data) {
  print(data);
}).catch(function (msg) {
  console.error(msg);
});
