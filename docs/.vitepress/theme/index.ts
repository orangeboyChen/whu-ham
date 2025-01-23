// https://vitepress.dev/guide/custom-theme
import { h, App } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import agconnect from '../../config/agcconnect';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  async enhanceApp({ app, router}) {
    app.use(ElementPlus);
    injectVueComponent({app});

    await agconnect.remoteConfig().initialized();
    await agconnect.remoteConfig().fetch();
    await agconnect.remoteConfig().apply();
  }
} satisfies Theme

const injectVueComponent = ({app}: {app: App}) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}