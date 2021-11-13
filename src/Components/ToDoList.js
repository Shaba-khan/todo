import React, { Component } from 'react';
import ToDoListItem from './ToDoListItem'


class ToDoList extends React.Component {
  renderItems() {
    if(this.props.activeTag==='all'){
    return this.props.listItems.map((item, index) => <ToDoListItem key={index} {...item} {...this.props} />)

    }else{
    return this.props.listItems.filter(data => data.selectTag ==this.props.activeTag ).map((item, index) => <ToDoListItem key={index} {...item} {...this.props} />)

    }
     
  }
  
  render() {
    console.log("gg")
    return (
      <div className="items-list">
        {this.renderItems()}
      </div>
    );
  }
}

export default ToDoList;
