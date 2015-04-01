import Home from 'manifold/pages/home';
import Login from 'manifold/pages/login';
import Dashboard from 'manifold/pages/dashboard';
import AddPost from 'manifold/pages/add-post';

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
    path: '/dashboard',
    method: 'GET',
    handler: Dashboard
  },
  {
    path: '/add-post',
    method: 'GET',
    handler: AddPost
  }
];

