import Home from 'manifold/pages/home';
import Login from 'manifold/pages/login';
import Dashboard from 'manifold/pages/admin/dashboard';
import AddPost from 'manifold/pages/admin/add-post';
import ShowPost from 'manifold/pages/show-post';

export default [
  {
    path: '/',
    method: 'GET',
    handler: Home
  },
  {
    path: '/login',
    method: 'GET',
    handler: Login
  },
  {
    path: '/admin/dashboard',
    method: 'GET',
    handler: Dashboard
  },
  {
    path: '/admin/add-post/:id?',
    method: 'GET',
    handler: AddPost
  },
  {
    path: '/post/:id',
    method: 'GET',
    handler: ShowPost
  }
];

