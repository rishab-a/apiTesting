/*import React from 'react';
import TableRowHead from '../../../components/table/rowHead';
import TableRow from '../../../components/table/row';
import Tracker from '../../../components/tracker-box'
import './index.css';

const RetrospectiveNew = (props) => {
    const { content } = props;
    return (
        <div id="container">
            <header>
                <h1 className="new-retro-title">{props.match.params.id} Retro
                
                </h1>
                <div className="new-retro-index">Happiness Index:
                <span>
                <input type="number" name="hpyIdx" min={0} max={5}/></span> / 5
                </div>
            </header>
           
            <div id="track-progress">
               
        </div>
        </div>
    )
}*/

import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import './index.css'



class RetrospectiveNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      columnid: '',
      comments: []
    };
  }

  componentDidMount() {

    this.setState({ });
    const pusher = new Pusher('d10973f4aeb6ded3f904', {
      cluster: 'ap2',
      encrypted: true
    });
    const channel = pusher.subscribe('retro-data');
    channel.bind('content', data => {
        console.log(data);
      this.setState({ comments: [...this.state.comments, {...data}], [data.columnid]: '' });
    });
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    if (e.keyCode === 13) {
      const payload = {
        ...this.state,
        columnid: e.target.id
      };
      axios.post('http://localhost:5000/Retrospective/New', payload);
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  }

  render() {
  const columns  =Array(5).fill(null);
    return (
      <div className="row">
      { columns.map((c, i) => {
        return (
        <div className="column">
          <div className="chat">
            <input
              type="text"
              id={i}
              value={this.state[i]}
              placeholder="type here..."
              className="form-control"
              onChange={this.handleTextChange}
              onKeyDown={this.handleTextChange}
            />
          </div>
          <div className="chatMessage">
            {this.state.comments.map(chat => {
              return (chat[i] &&
                <div key={chat.id} className="box">
                  <p>{chat[i]}</p>
                </div>
              )
            })}
          </div>
        </div>
        );
      })};
      </div>
    );
  }
}

export default RetrospectiveNew;