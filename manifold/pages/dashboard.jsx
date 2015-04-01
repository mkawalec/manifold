import React from 'react';
import fluxApp from 'fluxapp';

import {Row, Col, Button} from 'react-bootstrap';
import PostsList from 'manifold/components/posts-list';
import AdminLayout from 'manifold/components/admin-layout';

const isLoggedIn = (fluxapp) => {
  return fluxapp.getActions('session').get().then(() => {
    const session = fluxapp.getStore('session').state;
    if (!session || !session.username) {
      console.log('moving');
      const router = fluxapp.getRouter ? fluxapp.getRouter() : fluxApp.getRouter();
      return router.go('/');
    }
  });
};

const STYLE = {
  wrapper: {
    height: '100%'
  },
  column: {
    height: '100%'
  },
  addBtn: {
    width: '100%',
    marginBottom: '5px'
  }
};

export default React.createClass({
  displayName: 'dashboard',

  mixins: [ fluxApp.mixins.component ],

  statics: {
    load(route, fluxApp) {
      return fluxApp.getActions('posts').getAll();
      //return isLoggedIn(fluxApp);
    }
  },
  /*
  componentWillMount() {
    return isLoggedIn(this);
  },*/

  render() {
    return (
      <AdminLayout>
        <Col md={6} style={STYLE.column}>
          <Button 
            bsStyle='success'
            onClick={() => fluxApp.getRouter().go('/add-post')}
            style={STYLE.addBtn}
            >
              Add Post
          </Button>
          <PostsList/>
        </Col>

        <Col md={6}/>
      </AdminLayout>
    );
  }
});
