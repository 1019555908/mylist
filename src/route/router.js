// const Foo = () => import('./Foo.vue')
import Vue from "vue";
import VueRouter from 'vue-router';
import store from '../store/store'
import {
    box,
    oil,
    used,
    meat,
    home,
    deli,
    dairy,
    frult,
    water,
    drinks,
    snacks,
    kitchen,
    nourishing,
    vegetables,
    sort,
    sort1,
    sanji,
    mybl,
    eat,
    shopcar,
    register,
    login,
    customer,
    search,
    admin,
    benlaiweb

} from './index'

import my from '../components/my'
import less from '../components/less'
import shopxq from '../components/shopxq'
// import {
//     benlaiweb
// } from ''
Vue.use(VueRouter)
const routes = [{
    path: '/',
    redirect: '/box/box'
}, {
    path: '/home',
    redirect: '/box/box'
}, {
    path: '/box',
    component: box,
    children: [{
        path: '/',
        redirect: '/box/box'
    }, {
        path: 'box',
        component: home,
        name: 'home'
    }, {
        path: 'frult',
        component: frult,
        name: 'frult'
    }, {
        path: 'vegetables',
        component: vegetables,
        name: 'vegetables'
    }, {
        path: 'oil',
        component: oil,
        name: 'oil'
    }, {
        path: 'water',
        component: water,
        name: 'water'
    }, {
        path: 'meat',
        component: meat,
        name: 'meat'
    }, {
        path: 'deli',
        component: deli,
        name: 'deli'
    }, {
        path: 'nourishing',
        component: nourishing,
        name: 'nourishing'
    }, {
        path: 'drinks',
        component: drinks,
        name: 'drinks'
    }, {
        path: 'snacks',
        component: snacks,
        name: 'snacks'
    }, {
        path: 'dairy',
        component: dairy,
        name: 'dairy'
    }, {
        path: 'kitchen',
        component: kitchen,
        name: 'kitchen'
    }, {
        path: 'use',
        component: used,
        name: 'used'
    }]
}, {
    path: '/sort/:id?',
    component: sort,
    name: 'sort'
}, {
    path: '/sanji',
    component: sanji,
    name: 'sanji'
}, {
    path: '/eat/:id?',
    component: eat,
    name: 'eat'
}, {
    path: '/shopxq/:id?',
    component: shopxq,
    name: 'shopxq',
    meta: {
        bottomshow: false
    }
}, {
    path: '/shopcar',
    component: shopcar,
    name: 'shopcar',
    children: [],
    meta: {
        bottomshow: false
    }
}, {
    path: '/mybl',
    component: mybl,
    name: 'mybl',
    meta: {
        bottomshow: false
    }
}, {
    path: '/register',
    component: register,
    name: 'register',
    meta: {
        bottomshow: false
    }
}, {
    path: '/login',
    component: login,
    name: 'login',
    meta: {
        bottomshow: false,
        dltoken: true,
    },
}, {
    path: '/my',
    component: my,
    name: 'my',

}, {
    path: '/less',
    component: less,
    name: 'less',

}, {
    path: '/sort1/:id?',
    component: sort1,
    name: 'sort1',

}, {
    path: '/customer',
    component: customer,
    name: 'customer',
    meta: {
        bottomshow: false
    },
}, {
    path: '/search',
    component: search,
    name: 'search',
    meta: {
        bottomshow: false
    }
}, {
    path: '/admin',
    component: admin,
    name: 'admin',
    meta: {
        bottomshow: false
    }
}, {
    path: '/benlaiweb',
    component: benlaiweb,
    name: 'benlaiweb',
    meta: {
        bottomshow: false
    }
}]
const router = new VueRouter({
    routes,
})

router.beforeEach((to, from, next) => {
    from
    if (to.meta.bottomshow === false) {
        store.commit('changeState', false);
        //全局状态管理store的commit修改mutations的内容
    } else {
        store.commit('changeState', true);
    }
    // if(to.meta &&to.meta.requireLogin &&){
    //     next({
    //         path:'/login',
    //         from:to.from
    //     })
    // }else{
    //     next()
    // }
    next();
});

export default router;