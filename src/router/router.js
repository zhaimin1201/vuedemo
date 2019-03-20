import Vue from 'vue'
import Router from 'vue-router'
import LoginUser from '../page/login/loginuser'
import LoginNumber from '../page/login/loginnumber'
import MainPage from '../page/main/mainpage'
import Home from '../page/home/home'
import Work from '../page/work/work'
import Tool from '../page/tool/tool'
import My from '../page/my/my'
import Editpersonal from '../page/my/editpersonal'
import Allvisory from '../page/home/allvisory'
import Visit from '../page/visit/visit'
import Visichose from '../page/visit/visichose'
import Visichose2 from '../page/visit/visichose2'
import VisiRanking from '../page/visit/visitRanking'
import VisiRank from '../page/visit/visiranking2'
import Timer from '../page/timer/timer'
import Consultative from '../page/home/consultative'
import Consulist from '../page/home/consulist'
import Product from '../page/home/product'
import Team from '../page/visit/visiteam'
import Visitcho1 from '../page/visit/visitcho1'
import Visitcho2 from '../page/visit/visitcho2'
import Visitcho3 from '../page/visit/visitcho3'
import Visitcho4 from '../page/visit/visitcho4'
import Visitcho5 from '../page/visit/visitcho5'
import Forget from '../page/forgetword/forgetword'
import Resetpassword from '../page/forgetword/resetpassword'
import City from '../page/city/city'
import Nomessage from '../page/nomessgea/nomessage'
import Addvist from '../page/addvist/addvist'
import Clint from '../page/addvist/chooseclint'
import BulDing from '../page/bulding/bulding'
import Approval from '../page/approval/approval'
import ApprovalGo from '../page/approval/approvalgo'
import Vistlist from '../page/approval/vistlist'
import CustomerChange from '../page/approval/customerchage'
import Chosecustomeer from '../page/approval/chosecustomer'
import LoadMoreAndNoData from '../page/LoadMoreAndNoData/LoadMoreAndNoData'
import Learning from '../page/learning/learning'
import Histryreport from '../page/histryreport/histryreport'
import Custerreport from '../page/custerreport/custerreport'
import Rproduct from '../page/product/product'
import Performance from '../page/performance/performance'
import Asset from '../page/asset/asset'
import Bigechart from '../page/custerreport/bigechart'
import Pkindex from '../page/pkindex/pkindex'
import Pkresult from '../page/pkresult/pkresult'
Vue.use(Router)
Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'loginuser', //bulding loginuser
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/bulding',
      component: BulDing
    },
    {
      path: '/bulding',
      component: BulDing
    },
    {
      path: '/loginuser',
      component: LoginUser,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/loginnumber',
      component: LoginNumber,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/main',
      component: MainPage,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/consultative',
      component: Consultative,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/work',
      component: Work,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      name: 'tool',
      path: '/tool',
      component: Tool,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/my',
      component: My,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      name: 'editpersonal',
      path: '/editpersonal',
      component: Editpersonal
    },
    {
      name: 'allvisory',
      path: '/allvisory',
      component: Allvisory,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    {
      name: 'visite',
      path: '/visit',
      component: Visit,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      name: 'visichose1',
      path: '/my/visteam/visichose',
      component: Visichose,
      meta: {
        keepAlive: true // 不需要被缓存
      }
    },
    {
      name: 'visichose2',
      path: '/my/visteam/visichose2',
      component: Visichose2,
      meta: {
        keepAlive: true // 不需要被缓存
      }
    },
    {
      name: 'visirank1',
      path: '/visiranking',
      component: VisiRanking,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    {
      name: 'visirank2',
      path: 'visit/visiRanking2',
      component: VisiRank,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    {
      path: '/timer',
      component: Timer
    },
    {
      path: '/consulist',
      component: Consulist,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/product',
      component: Product,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      name: 'Visteam',
      path: '/visteam',
      component: Team,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      name: 'visicho1',
      path: '/my/visitcho1',
      component: Visitcho1,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      name: 'visicho2',
      path: '/my/visitcho2',
      component: Visitcho2,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      name: 'visicho3',
      path: '/my/visitcho3',
      component: Visitcho3,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      name: 'visicho4',
      path: '/my/visitcho4',
      component: Visitcho4,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      name: 'visicho5',
      path: '/my/visitcho5',
      component: Visitcho5,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/forgetword',
      component: Forget
    },
    {
      name: 'resetpassword',
      path: '/resetpassword',
      component: Resetpassword
    },
    {
      path: '/city',
      component: City
    },
    {
      path: '/nomessge',
      component: Nomessage
    },
    {
      name: 'addvist',
      path: '/addvist',
      component: Addvist,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      name: 'clint',
      path: '/clint',
      component: Clint,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    {
      path: '/approval',
      component: Approval
    },
    {
      path: '/approvalgo',
      component: ApprovalGo
    },
    {
      path: '/visitlist',
      component: Vistlist
    },
    {
      path: '/customerchange',
      component: CustomerChange
    },
    {
      path: '/chosecustomer',
      component: Chosecustomeer
    },
    {
      path: '/loadmore',
      component: LoadMoreAndNoData
    },
    {
      path: '/learning',
      component: Learning
    },
    {
      path: '/histryreport',
      component: Histryreport
    },
    {
      path: '/custerreport',
      component: Custerreport,
      // meta: {
      //   keepAlive: true // 需要被缓存
      // }
    },
    {
      path: '/reportduct',
      component: Rproduct
    },
    {
      path: '/performance',
      component: Performance
    },
    {
      path: '/asset',
      component: Asset
    },
    {
      name: 'bigechart',
      path: '/bigechart',
      component: Bigechart
    },
    {
      path: '/pkindex',
      component: Pkindex
    },
    {
      path: '/pkresult',
      component: Pkresult
    }
  ],
  linkExactActiveClass: 'active'
})
