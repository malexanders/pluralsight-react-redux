import React from 'react';
import {Tab, Tabs} from 'react-toolbox';
import { Link, IndexLink } from 'react-router';

class TabsTest extends React.Component {
  constructor() {
    super();


    this.state = {
      index: 0
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleActive = this.handleActive.bind(this);
  }

  handleTabChange(index) {
    this.setState({index});
  }

  handleActive(){
    console.log('Special one activated');
  }

  render () {
    return (
      <Tabs index={this.state.index} name="navigation" onChange={this.handleTabChange}>
        <Tab label='Home'></Tab>
        <Tab label='About' onActive={this.handleActive}><small>Secondary content</small></Tab>
        <Tab label='Courses' hidden><small>Fourth content hidden</small></Tab>
        <Tab label='Authors'><small>Fifth content</small></Tab>
      </Tabs>
    );
  }
}

export default TabsTest;
