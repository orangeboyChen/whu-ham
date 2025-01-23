import {DefaultTheme} from "vitepress/types/default-theme";

export const zhThemeConfig: DefaultTheme.Config = {
  lastUpdated: {
    text: '最后更新时间'
  },
  // contributorsText: '贡献者',
  // editLinkText: '编辑该页面',
  notFound: {
    title: '404'
  },
  // backToHome: '回到主页',
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
        collapsed: false,
        base: '/handbook/',
        items: [
          {
            text: '首页',
            link: 'index.md',
          },
          {
            text: '状态',
            link: 'status.md',
          },
          {
            text: '课程',
            link: 'course.md',
          },
          {
            text: '图书馆',
            link: 'library.md'
          },
          {
            text: '成绩',
            link: 'score.md'
          },
          {
            text: '运动',
            link: 'sport.md'
          },
          {
            text: '支付',
            link: 'pay.md'
          },
          {
            text: '日程',
            link: 'schedule.md'
          },
          {
            text: '校车',
            link: 'bus.md'
          },
          {
            text: '自动化',
            link: 'automatic.md'
          },
          {
            text: '同步',
            link: 'sync.md'
          },
          {
            text: '问题反馈',
            link: 'bugfix.md'
          }
        ]
      }
    ],
    '/privacy/': [
      {
        text: '协议',
        collapsed: true,
        base: '/privacy/',
        items: [
          {
            link: 'index.md',
          },
          {
            link: 'user-policy.md'
          }
        ]
      }
    ],
  }
}
