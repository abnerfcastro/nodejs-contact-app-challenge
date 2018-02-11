/**
 * ./server.js
 * 
 * Author: Abner Castro
 * Date: February 2nd, 2018
 */

const http = require('http');
const parse = require('url').parse;
const join = require('path').join;
const fs = require('fs');
const qs = require('querystring');

const Contacts = require('./server/contacts-dao');

// Initially load contacts
Contacts.load();

const server = http.createServer((req, res) => {
    let url = parse(req.url);
    
    // Handles API calls
    if (/\/api\/.*/.test(url.path)) {        
        switch (req.method) {
            case "GET":
                const all = Contacts.all();                
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(all));
                break;
            case "POST":
                req.setEncoding('utf8');
                let bytes = '';
                req.on('data', chunk => bytes += chunk);
                req.on('end', () => {
                    let payload = qs.parse(bytes)
                    Contacts.add(payload);
                    res.statusCode = 200;
                    res.end();
                });
                break;
            default:
                // Not Supported
                break;
        }
    } else {
        // Serve static files
        url.pathname = url.pathname === '/' ? '/index.html' : url.pathname;
        let path = join(__dirname, 'public', url.pathname);
        fs.stat(path, (err, stat) => {
            if (err) {
                if ('ENOENT' == err.code) {
                    res.statusCode = 404;
                    res.end('Not Found');
                } else {
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                }
            } else {
                // Treat .svg files with correct Content-Type
                if (/.*.svg$/.test(path))
                    res.setHeader('Content-Type', 'image/svg+xml');
                else if (/.*.ico$/.test(path))
                    res.setHeader('Content-Type', 'image/x-icon');
                
                res.setHeader('Content-Length', stat.size);

                let stream = fs.createReadStream(path);                
                stream.pipe(res);
                stream.on('error', err => {
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                });
            }
        });
    }
});

// const Contact = {
//     first_name: null,
//     last_name: null    
// }

// var contact = Object.create(Contact);

server.listen(process.env.PORT || 3000);