const ctx = require.context("./", true, /.js$/);
const module = {};
ctx.keys().forEach(k => {
	if (k === "./index.js") return;
	Object.assign(module, ctx(k));
});

export default module;
