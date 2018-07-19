// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import {Container, Header, Aside, Main, Input, Button, Upload, Icon} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Input);
Vue.use(Button);
Vue.use(Upload);
Vue.use(Icon);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
