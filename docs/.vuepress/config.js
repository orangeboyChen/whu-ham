const {defaultTheme} = require("vuepress");
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const { path } = require('@vuepress/utils')
const { docsearchPlugin } = require('@vuepress/plugin-docsearch')
const { searchPlugin } = require('@vuepress/plugin-search')

const { zhThemeConfig } = require('./config/nav/config.ts')

module.exports = {
    title: 'Ham',
    sidebar: 'auto',
    base: '/whu-ham/',
    head: [['link', { rel: 'icon', href: 'icon-1024.png' }]],
    plugins: [
        '@vuepress/last-updated',
        {
            transformer: (timestamp, lang) => {
                const moment = require('moment')
                moment.locale(lang)
                return moment(timestamp).fromNow()
            }
        },
        '@vuepress/active-header-links',
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
        docsearchPlugin({
            appId: '92H3AM2QST',
            apiKey: 'c509e924662c649625019c373a234990',
            indexName: 'whu-ham'
        }),
        // searchPlugin({
        //     // 配置项
        // }),
    ],

    theme: defaultTheme({
        smoothScroll: true,
        repo: 'orangeboyChen/whu-ham',
        editLinks: true,
        docsRepo: 'orangeboyChen/whu-ham',
        docsDir: 'docs',
        docsBranch: 'main',

        locales: {
            '/': {
                ...zhThemeConfig,
            }
        }

    })
}

