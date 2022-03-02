module.exports = {
    title: 'Ham',
    sidebar: 'auto',
    themeConfig: {
        smoothScroll: true,
        repo: 'orangeboyChen/whu-ham',
        lastUpdated: '最后更新时间',
        editLinks: true,
        docsRepo: 'orangeboyChen/whu-ham',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinkText: '编辑该页面',
        nav: [
            {
                text: '使用手册',
                link: '/handbook/'
            },
            {
                text: '下载',
                link: '/download/'
            },
            {
              text: '关于',
              link: '/about/'
            },
            {
                text: '隐私协议',
                link: '/privacy/'
            }
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