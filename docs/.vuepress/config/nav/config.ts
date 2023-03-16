import { DefaultThemeLocaleData } from "@vuepress/theme-default/lib/shared/options";

export const zhThemeConfig: DefaultThemeLocaleData = {
    lastUpdatedText: '最后更新时间',
    contributorsText: '贡献者',
    editLinkText: '编辑该页面',
    notFound: ['你喵的要去哪里啊', '你做肛拭子没啊', '明天核酸'],
    backToHome: '回到主页',
    navbar: [
        {
            text: '下载',
            link: '/download/'
        },
        {
            text: '使用手册',
            link: '/handbook/'
        },
        {
            text: '协议',
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
                text: '使用手册',
                collapsible: false,
                children: [
                    '/handbook/README.md',
                    '/handbook/status.md',
                    '/handbook/course.md',
                    '/handbook/library.md',
                    '/handbook/score.md',
                    '/handbook/sport.md',
                    '/handbook/pay.md',
                    '/handbook/schedule.md',
                    '/handbook/bus.md',
                    '/handbook/automatic.md',
                    '/handbook/sync.md',
                    '/handbook/bugfix.md'
                ]
            }
        ],
        '/privacy/': [
            {
                text: '协议',
                collapsible: false,
                children: [
                    '/privacy/README.md',
                    '/privacy/user-policy.md'
                ]
            }
        ],
    }
}
