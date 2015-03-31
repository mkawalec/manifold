import UsersController from 'api/users/controller';
import PostsController from 'api/posts/controller';

export default (hapi) => {
  UsersController(hapi);
  PostsController(hapi);
};
