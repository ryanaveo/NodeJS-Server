const http = require('http');
const server = http.createServer();
server.on('request', (req,res) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World!');
});
server.on('connection', handleConnection)
server.listen(3000);

function handleConnection(socket) {
	socket.once('readable', function() {
		let reqBuffer = new Buffer('');
		let buf;
		let reqHeader;
		while(true) {
			buf = socket.read();
			if (buf === null) break;

			let marker = req.buffer.indexOf('\r\n\r\n');
			if (marker !== -1) {
				let remaining = req.Buffer.slice(marker + 4);
				reqHeader = reqBuffer.slice(0, marker).toString();
				socket.unshift(remaining);
				break;
			}
		}
		console.log(`Request header:\n${reqHeader}`);

		// reading the whole request body

		reqBuffer = new Buffer('');
		while((buf = socket.read()) != null) {
			reqBuffer = Buffer.concat([reqBuffer, buf])
		}
		let reqBody = reqBuffer.toString();
		console.log(`Request body:\n${reqBody}`);

		socket.end('HTTP/1.1 200 OK\r\nServer: my-custom-server\r\nContent-Length: 0\r\n\r\n');
	}));
}