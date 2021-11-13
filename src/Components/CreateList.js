import React, { Component } from 'react';

class CreateList extends React.Component {
   constructor(props) {
    super(props);
    
    this.state = {
      selectTag:'all',
      
    };
  }
  

  handleCreate(e) {
    e.preventDefault();
    if (!this.refs.newItemInput.value) {
      alert('Please enter a task name.');
      return;
    } else if (this.props.listItems.map(element => element.name).indexOf(this.refs.newItemInput.value) != -1) {
      alert('This task already exists.');
      this.refs.newItemInput.value = '';
      return;
    }
    console.log(this.state.selectTag)
    this.props.createItem(this.refs.newItemInput.value,this.state.selectTag);
    this.refs.newItemInput.value = '';
  }
  onChangeSelect(e){
    if(e.target.value==''){
     this.setState({selectTag:'all'})

    }
   this.setState({selectTag:e.target.value})
  }
  render() {
    return (
      <div className="create-new">
       <div className="row m-0">
        <div className='col-md-10'>
        <form onSubmit={this.handleCreate.bind(this)}>
          <input type="text" placeholder="New Task" ref="newItemInput" className="form-input mr-1"/>
          <select className="form-select" aria-label="Default select example" onChange={e=>this.onChangeSelect(e) }>
            <option selected value="all">Select tags</option>
            <option value="react">React</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
          <button className=" btn btn-custm ">Create</button>
        </form>
        </div>
        <div className='col-md-2 text-center my-auto'>
           <button className="btn btn-danger" onClick={e=>this.props.ConfirmDelete(e)}>
              <i className="fas fa-trash-alt text-white"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateList;
