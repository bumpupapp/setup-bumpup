const core = require('@actions/core');
const exec = require('@actions/exec');

const version = core.getInput('version', {required: false}) || 'main';
const args = core.getInput('args', {required: false}) || '';
const cwd = core.getInput('cwd', {required: false}) || '.';

(async () => {
    try {
        await exec.exec(`deno install -n bumpup --root . --allow-all https://raw.githubusercontent.com/bumpupapp/cli/${version}/mod.ts`)
        core.addPath(process.cwd()+'/bin');
    } catch (error) {
        core.setFailed(error.message);
    }
})();
