import React from 'react';
import fluxApp from 'fluxapp';
import marked from 'marked';

const STYLE = {
  wrapper: {
    height: '100%',
    overflow: 'auto'
  }
};

export default React.createClass({
  displayName: 'previewPost',

  mixins: [ fluxApp.mixins.component ],

  propTypes: {
    post: React.PropTypes.string
  },

  flux: {
    stores: {
      updateRaw: 'draft'
    }
  },

  getInitialState() {
    return {
      parsed: ''
    };
  },

  updateRaw() {
    const {body} = this.getStore('draft').state;
    this.setState({
      parsed : markdown.parse(body)
    });
  },

  render() {
    const html = this.state.parsed || marked(this.props.post || '');

    return (
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        style={STYLE.wrapper}
       />
    );
  }

});
