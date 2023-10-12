var oldConsole = console;
const safeLog = (...data) => {
	return data.map((item) => {
		if (item instanceof HTMLElement) {
			return item.outerHTML;
		}
		if (item instanceof Function) {
			return item.toString();
		}
		if (item instanceof Object) {
			return JSON.stringify(item);
		}
		return item;
	});
};


console = {
	log: function (...data) {
		oldConsole.log(...data);
		let payload = JSON.stringify({
			type: 'log',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	warn: function (...data) {
		oldConsole.warn(...data);
		let payload = JSON.stringify({
			type: 'warn',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	error: function (...data) {
		oldConsole.error(...data);
		let payload = JSON.stringify({
			type: 'error',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	info: function (...data) {
		oldConsole.info(...data);
		let payload = JSON.stringify({
			type: 'info',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	debug: function (...data) {
		oldConsole.debug(...data);
		let payload = JSON.stringify({
			type: 'debug',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	clear: function () {
		oldConsole.clear();
		let payload = JSON.stringify({
			type: 'clear'
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	table: function (...data) {
		oldConsole.table(...data);
		let payload = JSON.stringify({
			type: 'table',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	dir: function (...data) {
		oldConsole.dir(...data);
		let payload = JSON.stringify({
			type: 'dir',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	dirxml: function (...data) {
		oldConsole.dirxml(...data);
		let payload = JSON.stringify({
			type: 'dirxml',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	trace: function (...data) {
		oldConsole.trace(...data);
		let payload = JSON.stringify({
			type: 'trace',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	group: function (...data) {
		oldConsole.group(...data);
		let payload = JSON.stringify({
			type: 'group',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	groupCollapsed: function (...data) {
		oldConsole.groupCollapsed(...data);
		let payload = JSON.stringify({
			type: 'groupCollapsed',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	groupEnd: function (...data) {
		oldConsole.groupEnd(...data);
		let payload = JSON.stringify({
			type: 'groupEnd',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	time: function (...data) {
		oldConsole.time(...data);
		let payload = JSON.stringify({
			type: 'time',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	timeEnd: function (...data) {
		oldConsole.timeEnd(...data);
		let payload = JSON.stringify({
			type: 'timeEnd',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	count: function (...data) {
		oldConsole.count(...data);
		let payload = JSON.stringify({
			type: 'count',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	assert: function (...data) {
		oldConsole.assert(...data);
		let payload = JSON.stringify({
			type: 'assert',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	profile: function (...data) {
		oldConsole.profile(...data);
		let payload = JSON.stringify({
			type: 'profile',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	profileEnd: function (...data) {
		oldConsole.profileEnd(...data);
		let payload = JSON.stringify({
			type: 'profileEnd',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	timeStamp: function (...data) {
		oldConsole.timeStamp(...data);
		let payload = JSON.stringify({
			type: 'timeStamp',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
	context: function (...data) {
		oldConsole.context(...data);
		let payload = JSON.stringify({
			type: 'context',
			data: safeLog(...data)
		});
		parent.window.postMessage({ type: 'log', args: payload }, '*');
	},
};
