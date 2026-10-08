const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello');
});
server.listen(5001, () => {
    console.log('Test Server running on 5001');
});
setInterval(() => {
    console.log('Heartbeat');
}, 2000);
