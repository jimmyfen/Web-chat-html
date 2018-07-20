import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_production');
const Index  = _import('Index');
// const Index = import('@/components/Index');
// import Index from '@/components/Index';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }
  ]
})
