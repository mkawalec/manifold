import React from 'react';
import fluxApp from 'fluxapp';
import markdown from 'markdown';

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
    }
  },

  updateRaw() {
    const {body} = fluxApp.getStore('draft').state;
    this.setState({
      parsed : markdown.parse(body)
    });
  },

  render() {
    const html = this.state.parsed || markdown.parse(this.props.post || '');

    return (
      <div 
        dangerouslySetInnerHTML={{ __html: html }} 
        style={STYLE.wrapper} 
       />
    );
  }

});
