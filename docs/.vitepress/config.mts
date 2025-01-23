import { defineConfig } from 'vitepress'
import {zhThemeConfig} from "./zh_config";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "1",
  description: "1",
  srcDir: 'src',
  head: [
    ['script', {async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-P03RPXXGT4'}],
    ['link', {rel: 'icon', href: 'icon-1024 2.png'}],
    ['link', {rel: 'manifest', href: 'https://orangeboychen.github.io/whu-ham/manifest.webmanifest'}]
  ],
  themeConfig: {
    logo: '/icon-1024 2.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'algolia',
      options: {
        appId: '92H3AM2QST',
        apiKey: 'c509e924662c649625019c373a234990',
        indexName: 'whu-ham'
      }
    },
    lastUpdated: true,
    ...zhThemeConfig
  }
})
