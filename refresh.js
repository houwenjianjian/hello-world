const fs = require('fs')
const hanlebars =  require('handlebars')
const chalk = require('chalk')
module.exports = async () => {
    // 获取页面列表
     const list = fs.readdirSync('./src/views')
     .filter(v => v !== 'Home.vue')
     .map(v => ({
         name: v.replace('.vue','').toLowerCase(),
         file: v
     }))
    
    //  生成路由定义
    compile({list},'./src/router.js','./template/router.js.hbs')

    // 生成菜单
    compile({list},'./src/App.vue','./template/App.vue.hbs')
    
    
    
    
    
    // 编译模板文件
    // {*}meta 数据定义
    // {*} filePath 目标文件路径
    // {*} templatePath 模板文件路径
    // 
    // 
    function compile(meta,filePath,templatePath) {
        if(fs.existsSync(templatePath)){
            const content = fs.readFileSync(templatePath).toString()
            const result = hanlebars.compile(content)(meta)
            fs.writeFileSync(filePath,result)
            console.log(chalk.green(`🚀 ${filePath} 创建成功`))
        }
    }
}