import React, { Component } from 'react';

class HelloMessage extends Component {



  render() {
    return <div>
      <span>{{this.props.timestamp}}</span>
      <span>{{this.props.message}}</span>
      <span>{{this.props.user}}</span>
    </div>

  }
}

export default Message;
