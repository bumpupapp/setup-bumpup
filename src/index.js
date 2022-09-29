const core = require('@actions/core');
const exec = require('@actions/exec');

const version = core.getInput('version', {required: false}) || '1.0.0-15';
const args = core.getInput('args', {required: false}) || '';
const cwd = core.getInput('cwd', {required: false}) || '.';

(async () => {
    try {
        await exec.exec(`deno install -n bumpup --root . --allow-all https://raw.githubusercontent.com/danielr1996/bumpup/${version}/packages/cli/mod.ts
        core.addPath(process.cwd()+'/bin');
    } catch (error) {
        core.setFailed(error.message);
    }
})();
