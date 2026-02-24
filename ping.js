const http = require('http');

const req = http.request('http://localhost:3000/login', { method: 'GET' }, (res) => {
    console.log('STATUS:', res.statusCode);
    console.log('HEADERS:', res.headers);
    res.on('data', () => { });
    res.on('end', () => console.log('Done'));
});

req.on('error', (e) => {
    console.error(`Problem: ${e.message}`);
});
req.end();
