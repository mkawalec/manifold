import Home from 'manifold/pages/home';
import Login from 'manifold/pages/login';
import Dashboard from 'manifold/pages/admin/dashboard';
import UserSettings from 'manifold/pages/admin/user-settings';
import AddPost from 'manifold/pages/admin/add-post';
import ShowPost from 'manifold/pages/show-post';

export default [
  {
    id: 'home',
    path: '/',
    method: 'GET',
    handler: Home,
  },
  {
    id: 'login',
    path: '/login',
    method: 'GET',
    handler: Login,
  },
  {
    id: 'dashboard',
    path: '/admin/dashboard',
    method: 'GET',
    handler: Dashboard,
  },
  {
    id: 'add-post',
    path: '/admin/add-post(/:id)',
    method: 'GET',
    handler: AddPost,
  },
  {
    id: 'user-settings',
    path: '/admin/settings/user',
    method: 'GET',
    handler: UserSettings,
  },
  {
    id: 'show-post',
    path: '/post/:id',
    method: 'GET',
    handler: ShowPost,
  },
]

