import React, { Component } from 'react';


class ToDoListItem extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editing: false
    };
  }
  
  renderName() {
    const itemStyle = {
      'textDecoration': this.props.completed ? 'line-through' : 'none',
      cursor: 'pointer',
      colorL:'red'
    };
    
    if(this.state.editing) {
      return (
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input className="form-input" style={{width:'80%'}} type="text" ref="editInput" defaultValue={this.props.name} />
          </form>
      );
    }
    
    return (
      <span style={itemStyle} key={this.props.id} onClick={this.props.toggleComplete.bind(this, this.props.name)}>{this.props.name}</span>
    );
  }
  
  renderButtons33() {
    if (this.state.editing) {
      return (
        <span>
          <button onClick={this.onSaveClick.bind(this)}>Save</button>
          <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
        </span>
      );
    }
    
    return (
      <span>
        <button className="btn " onClick={this.edit.bind(this)}><i className="fas fa-edit text-success"></i></button>
        <button className="btn " onClick={this.props.deleteItem.bind(this, this.props.id)}>
              <i className="fas fa-trash-alt text-danger"></i>
        </button>
      </span>
    );
  }
renderButtons() {
    if (this.state.editing) {
      return (
        <span>
          <button className=" btn-custm" onClick={this.onSaveClick.bind(this)}>Save</button>
          <button className="btn-custm" onClick={this.onCancelClick.bind(this)}>Cancel</button>
        </span>
      );
    }
    
    return (
      <span>
        <span onClick={this.onEditClick.bind(this)} ><i className="fas fa-edit text-success"></i></span>
        <span className="ml-3" onClick={this.props.deleteItem.bind(this, this.props.id)}>
              <i className="fas fa-trash-alt text-danger"></i>
        </span>
      </span>
    );
  }
  renderCheckbox() {
    
    return (
      <span>
        <input  key={this.props.id} type="checkbox" id={this.props.id} onChange={e => this.props.deleteMultipleItem(e,this.props.id)}  />
      </span>
    );
  }

  
  onEditClick() {
    this.setState({ editing: true });
  }
  
  onCancelClick() {
    this.setState({ editing: false });
  }
   edit() {
    this.setState({ editing: false });
  }

  onSaveClick(e) {
    e.preventDefault();
    this.props.saveItem(this.props.name, this.refs.editInput.value);
    this.setState({ editing: false });
  }
  
  render() {
    return (
      <div className="to-do-item row">
      <div className="col-md-8 text-left ">
       <span className="name">
            {this.renderCheckbox()}
        </span>
        <span className="name">
             {this.renderName()}
        </span>
      </div>
      <div className="col-md-4  text-right">
        <span className="actions">
        {this.renderButtons()}
        </span>
      </div>
      </div>
    );
  
  }
}

export default ToDoListItem;
