module.exports = {
    title: 'Ham',
    sidebar: 'auto',
    base: '/whu-ham/',
    head: [
        [
            'link',
            { rel: 'icon', href: 'icon-1024.png' }
        ]
    ],
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

    ],
    locales: {
      '/': {
          lang: 'zh-CN',
      }
    },
    themeConfig: {
        lastUpdated: '最后更新时间',
        smoothScroll: true,
        repo: 'orangeboyChen/whu-ham',
        editLinks: true,
        docsRepo: 'orangeboyChen/whu-ham',
        docsDir: 'docs',
        docsBranch: 'main',
        editLinkText: '编辑该页面',
        nav: [
            {
                text: '下载',
                link: '/download/'
            },
            {
                text: '使用手册',
                link: '/handbook/'
            },
            {
                text: '隐私协议',
                link: '/privacy/'
            },
            {
                text: '关于',
                link: '/about/'
            },
        ],
        sidebar: {
            '/handbook/': [
                {
                    title: '使用手册',
                    collapsable: false,
                    children: [
                        '',
                        'status',
                        'course',
                        'library',
                        'score',
                        'automatic',
                        'bugfix'
                    ]
                }

            ]
        }
    }
}