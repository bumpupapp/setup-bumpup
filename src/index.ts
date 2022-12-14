import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as tc from '@actions/tool-cache'

(async()=>{
    try {
        const version = core.getInput('version', {required: false});
        let toolPath = tc.find("bumpup", version)
        if (!toolPath) {
            const baseUrl = `https://packages.danielr1996.de/@bumpup/cli${version === 'latest' ? `` : `@${version}`}`
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
            await exec.exec("chmod", ["+x", bumpupPath], {silent: true})
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
})()
