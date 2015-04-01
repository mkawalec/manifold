import React from 'react';
import fluxApp from 'fluxapp';
import markdown from 'markdown';

const STYLE = {
  wrapper: {
    height: '100%'
  }
};

export default React.createClass({
  displayName: 'previewPost',

  mixins: [ fluxApp.mixins.component ],

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
    console.log(markdown);
    this.setState({
      parsed : markdown.parse(body)
    });
  },

  render() {
    return (
      <div 
        dangerouslySetInnerHTML={{__html: this.state.parsed}} 
        style={STYLE.wrapper} 
       />
    );
  }

});
