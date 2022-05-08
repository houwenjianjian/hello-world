const {promisify} = require ('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const {clone} = require('./download')
const open = require('open')

 // proc 是子进程本身
 //stdout 是 子进程的输出流
const  spawn = async (...args) =>{
    const {spawn} = require('child_process')
    return new Promise(resolve =>{
        const proc = spawn(...args) 
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr) 
        proc.on('close',()=>{
            resolve()
        })
    })
}


module.exports = async name =>{
    //  打印欢迎界面
    clear()
    const data = await figlet(`${name}  Welcome`)
    log(data)
    // 克隆项目
    await clone('github:su37josephxia/vue-template',name)
    
    // 安装依赖
    log('安装依赖')
    // await spawn('npm',['install'],{cwd: `./${name}` }) // 这个只能在linux系统使用  下面是windows和linux
    await spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm',['install'],{cwd: `./${name}` })
    log('安装成功')

    // 打开浏览器
    open('http://localhost:8080')
    await spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm',['run','serve'],{cwd: `./${name}`})
}

