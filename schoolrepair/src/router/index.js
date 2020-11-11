import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import AllRepairs from '../views/AllRepairs.vue'
import DataReport from '../views/DataReport.vue'
import MyTask from '../views/MyTask.vue'
import Handle from '../views/Handle.vue'
import ImportAndExport from '../views/ImportAndExport.vue'
import ImportAndExportInfo from '../views/ImportAndExportInfo.vue'
import MaintenancePickUp from '../views/MaintenancePickUp.vue'
import ModifyEmployee from '../views/ModifyEmployee.vue'
import Power from '../views/Power.vue'
import RepairTask from '../views/RepairTask.vue'
import ReportForRepair from '../views/ReportForRepair.vue'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
    { path: "/", redirect: '/login' },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    }, {
        path: '/home',
        name: 'Home',
        component: Home,
        redirect: "/index",
        children: [
            { path: '/index', component: Index },
            { path: '/reportForRepair', component: ReportForRepair },
            { path: '/handle', component: Handle },
            { path: '/repairTask', component: RepairTask },
            { path: '/myTask', component: MyTask },
            { path: '/maintenancePickUp', component: MaintenancePickUp },
            { path: '/allRepairs', component: AllRepairs },
            { path: '/importAndExport', component: ImportAndExport },
            { path: '/importAndExportInfo', component: ImportAndExportInfo },
            { path: '/power', component: Power },
            { path: '/modifyEmployee', component: ModifyEmployee },
            { path: '/dataReport', component: DataReport },
        ]
    },

]

const router = new VueRouter({
    routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//没有token则返回登录界面
router.beforeEach((to, from, next) => {
    if (to.path === '/Login') return next();
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) return next('/Login');
    next();
})

export default router;