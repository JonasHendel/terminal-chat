var socket = require('socket.io-client')('http://10.100.16.157:3000');
const repl = require('repl');
const chalk = require('chalk');
let username = null

socket.on('disconnect', function () {
	socket.emit('disconnect');
});
socket.on('connect', () => {
	console.log(chalk.red('=== start chatting ==='));
  username = process.argv[2]
});
socket.on('message', (data) => {
	const { cmd, username } = data;
	console.log(chalk.green(username + ': ' + cmd.split('\n')[0]));
});
repl.start({
	prompt: '',
	eval: (cmd) => {
		socket.send({cmd, username});
	},
});
