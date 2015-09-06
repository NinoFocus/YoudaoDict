export default function print(data) {
    data = JSON.parse(data);
    parse(data);
}

function parse(data) {
    if(data.errorCode != 0) {
        console.log({
            '20': '要翻译的文本过长',
            '30': '无法进行有效的翻译',
            '40': '不支持的语言类型',
            '50': '无效的key',
            '60': '无词典结果，仅在获取词典结果生效'
        }[data.errorCode])
        return
    }
    parse_phonetic_symbol(data)
    parse_dict_trans(data)
    parse_web_trans(data)
}

function parse_phonetic_symbol(data) {
    var phonetic = (data.basic || {}).phonetic
    if(phonetic) {
        console.log(' ', data.translation.join(' '), '\x1b[32m[' + data.basic.phonetic + ']')
    } else {
        console.log(' ', data.translation.join(' '))
    }
}

function parse_dict_trans(data) {
    var explains = (data.basic || {}).explains || []
    if(explains.length) {
        console.log('\x1b[0')
        __('YouDao Dict', '=')
        for(var i = 0, l = explains.length; i < l; i++) {
            console.log('\x1b[33m ', explains[i])
        }
    }
}

function parse_web_trans(data) {
    var web = data.web || []
    if(web.length) {
        console.log()
        __('Network', '=')
        for(var i = 0, l = web.length; i < l; i++) {
            __(web[i].key)
            for(var j = 0; j < web[i].value.length; j++) {
                console.log(' ', web[i].value[j])
            }
        }
    }
}

function __(title, pad, len) {
    pad = pad || '-'
    len = len || 30

    var length = len - 2 - title.length
    if(length > 0) {
        console.log('\x1b[0m' +
            str_repeat(pad, Math.ceil(length / 2)),
            title,
            str_repeat(pad, Math.floor(length / 2))
        )
    } else {
        console.log(title)
    }
}

function str_repeat(str, num) {
    var result = ''
    for(var i = 0; i < num; i++) {
        result += str
    }
    return result
}

