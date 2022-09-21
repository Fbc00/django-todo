import Vue from 'vue'
import Router from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout'
import PrivateLayout from '@/layouts/PrivateLayout'
import TaskUpdateView from '@/views/TaskUpdateView'
import TasksListView from '@/views/TasksListView'
import HomeView from '@/views/HomeView'
import LoginView from '@/views/LoginView'
import NewTaskView from '@/views/NewTaskView'
import RegisterView from '@/views/RegisterView'
Vue.use(Router)
export default new Router ({
    mode:'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        component: PublicLayout,
        children: [ {
            path: '',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },

        {
            path: '/register',
            name: 'register',
            component: RegisterView

        }
        ]
    },
    {
        path: '/tasks',
        component: PrivateLayout,
        children: [ { 
            path: ':id',
            name: 'taskUpdate',
            component: TaskUpdateView,
        },
        {
            path: '',
            name: 'taskList',
            component: TasksListView,
          },
          {
            path: '/new',
            name: 'taskNew',
            component: NewTaskView,
          }
    ] 
    },
    
 ],

})