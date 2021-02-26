const core = require('@actions/core');
const exec = require('@actions/exec');

const version = core.getInput('version', {required: false}) || '1.0.0-15';
const args = core.getInput('args', {required: false}) || '';
const cwd = core.getInput('cwd', {required: false}) || '.';

(async () => {
    try {
        await exec.exec(`deno --unstable install -n bumpup --root . --allow-run --allow-read --allow-write https://x.nest.land/bumpup:cli@${version}/mod.ts`)
        core.addPath(process.cwd()+'/bin');
    } catch (error) {
        core.setFailed(error.message);
    }
})();
