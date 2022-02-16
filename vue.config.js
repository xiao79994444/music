

module.exports = {
    devServer: {
        port: 8000,
        disableHostCheck: true,
        open: true,
        overlay: {
            warnings: true,
            errors: true,
        },
    },
    // 关闭eslint校验
    lintOnSave: false,
    // rem
    chainWebpack: config => {
        config.module
            .rule('css')
            .test(/\.css$/)
            .oneOf('vue')
            .resourceQuery(/\?vue/)
            .use('px2rem')
            .loader('px2rem-loader')
            .options({
                remUnit: 192   //代表的是 1rem = ？px  这里假设设计稿是 1920px ，那么这里的比例就是 1/10
            })
            .end()
    }

}