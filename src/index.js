const core = require('@actions/core');
const exec = require('@actions/exec');
const tc = require('@actions/tool-cache');

const version = core.getInput('version', {required: false}) || '';

(async () => {
    try {
        let toolPath = tc.find("bumpup", version)
        if (!toolPath) {
            const baseUrl = `https://packages.danielr1996.de/@bumpup/cli${version !== '' ? `@` :''}${version}`
            let platformUrl
            if (process.platform === 'win32') {
                platformUrl = '/bumpup.exe'
            } else if (process.platform === 'linux') {
                platformUrl = '/bumpup_linux_x68'
            } else if (process.platform === 'darwin' && process.arch === 'x64') {
                platformUrl = '/bumpup_darwin_x86'
            } else if (process.platform === 'darwin' && process.arch === 'arm64') {
                platformUrl = '/bumpup_darwin_aarch64'
            }
            const bumpupPath = await tc.downloadTool(baseUrl + platformUrl)
            console.log(bumpupPath)
            await exec("chmod", ["+x", kubectlPath], {silent: true})
            toolPath = await tc.cacheFile(
                bumpupPath,
                "bumpup",
                "bumpup",
                version
            )
        }
        console.log(toolPath)
        core.addPath(toolPath)
    } catch (error) {
        core.setFailed(error.message);
    }
})();
