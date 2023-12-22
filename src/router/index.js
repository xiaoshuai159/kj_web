import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/knowledgeManage/labelManage',
    component: Layout,
    hidden: true,
    meta: {
      title: '知识管理 / 法律法规管理 / 条款数字化'
    },
    children: [{
      path: '/knowledgeManage/labelManage',
      component: () => import('../components/lawsManage/labelManage'),
      meta: {
        title: '标签管理',
        keepAlive: true,
      }
    }]
  }, {
    path: '/addlawsFile',
    component: Layout,
    hidden: true,
    meta: {
      title: '知识管理 / 法律法规管理 / 法律文件管理'
    },
    children: [{
      path: '/lawsManage/addlawsFile',
      component: () => import('../components/lawsManage/addlawsFile'),
      meta: {
        title: '新增',
        // icon:'el-icon-menu',
        keepAlive: true
      }
    }]
  }, {
    path: '/addtermFile',
    component: Layout,
    hidden: true,
    meta: {
      title: '知识管理 / 法律法规管理 / 条款管理'
    },
    children: [{
      path: '/lawsManage/addtermFile',
      component: () => import('../components/lawsManage/addtermFile'),
      meta: {
        title: '新增',
        // icon:'el-icon-menu',
        keepAlive: true
      }
    }]
  }, {
    path: '/addstandardizeFile',
    component: Layout,
    hidden: true,
    meta: {
      title: '知识管理 / 法律法规管理 / 条款标准化'
    },
    children: [{
      path: '/lawsManage/addstandardizeFile',
      component: () => import('../components/lawsManage/addstandardizeFile'),
      meta: {
        title: '新增',
        // icon:'el-icon-menu',
        keepAlive: true
      }
    }]
  }, {
    path: '/adddigitalFile',
    component: Layout,
    hidden: true,
    meta: {
      title: '知识管理 / 法律法规管理 /  条款数字化'
    },
    children: [{
      path: '/lawsManage/adddigitalFile',
      component: () => import('../components/lawsManage/adddigitalFile'),
      meta: {
        title: '新增',
        // icon:'el-icon-menu',
        keepAlive: true
      }
    }]
  }, {
    path: '/subPage',
    component: Layout,
    hidden: true,
    meta: {
      title: '知识管理 / 处理者管理 /  申报表'
    },
    children: [{
      path: '/processorManage/shenbao',
      component: () => import('../components/processorManage/shenbao'),
      meta: {
        title: '新增申报表',
        // icon:'el-icon-menu',
        keepAlive: true
      }
    }]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home', keepAlive: true }
    }]
  },
  {
    path: '/dataOrigin',
    component: Layout,
    children: [{
      path: '/dataOrigin',
      component: () => import('@/views/dataOrigin/index'),
      meta: {
        title: '数据源管理',
        icon: 'el-icon-s-data',
        keepAlive: true
      }
    }]
  },
  {
    path: '/knowledgeManage',
    component: Layout,
    meta: {
      title: '知识管理',
      icon: 'el-icon-s-management',
      keepAlive: true
    },
    children: [{
      path: '/knowledgeManage/lawsManage',
      component: () => import('@/views/knowledgeManage/lawsManage'),

      children: [
        { path: '/lawsManage', meta: { title: '法律法规管理', keepAlive: true } }
      ]
    }, {
      path: '/classifyManage',
      component: () => import('@/views/knowledgeManage/classifyManage'),
      children: [
        { path: 'classifyManage', meta: { title: '分级分类管理', keepAlive: true } }
      ]
    }, {
      path: '/processorManage',
      component: () => import('@/views/knowledgeManage/processorManage'),
      // meta: {
      //   title: '处理者管理',
      //   keepAlive: true
      // },
      // children: [{
      //   path: '/subPage',
      //   component: () => import('../components/processorManage/shenbao'),
      //   meta: {
      //     title: '申报表',
      //     keepAlive: true
      //   }}
      // ]
      children: [
        { path: 'processorManage', meta: { title: '处理者管理', keepAlive: true } }
      ]
    }]
  },
  {
    path: '/incidentSearch',
    component: Layout,
    children: [{
      path: '/incidentSearch',
      component: () => import('@/views/incidentSearch/index'),
      meta: {
        title: '违规事件查询',
        icon: 'el-icon-s-order',
        keepAlive: true
      }
    }]
  }, {
    path: '/encryptedTraffic',
    component: Layout,
    children: [{
      path: '/encryptedTraffic',
      component: () => import('@/views/encryptedTraffic/index'),
      meta: {
        title: '加密流量留存策略管理',
        icon: 'el-icon-s-claim',
        keepAlive: true
      }
    }]
  },{
    path: '/systemManage',
    component: Layout,
    children: [{
      path: '/systemManage',
      component: () => import('@/views/systemManage/index'),
      meta: {
        title: '系统管理',
        icon: 'el-icon-menu',
        keepAlive: true
      }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
