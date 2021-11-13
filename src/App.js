import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateList from './Components/CreateList';
import ToDoList from './Components/ToDoList';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

const listItems = [
  {
    name: 'Lorem ipsum dolor sit amet1',
    completed: false,
    id: Math.random(),
    selectTag:'all'
  },
  {
    name: 'Lorem ipsum dolor sit amet2',
    completetd: false,
    id: Math.random(),
    selectTag:'all'


  },
  {
    name: 'Lorem ipsum dolor sit amet3',
    id: Math.random(),
    completed: false,
    selectTag:'all'

  },
  {
    name: "Click on task to mark as complete",
    completed: false,
    id: Math.random(),
    selectTag:'react'
    
  }

];


class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      listItems,
      multipleDelete:[],
      activeTag:'all'
    };
   
  }
  componentWillMount(){
  if (localStorage && localStorage.getItem('listItems')) {
      this.setState({
        listItems: JSON.parse(localStorage.getItem('listItems'))
      });
    }
    else {
      this.setState({listItems: listItems})
    }
  }
  createItem(item,tag) {
    this.state.listItems.unshift({
      name: item,
      completed: false,
      id: Math.random(),
      selectTag:tag
      
    });
    this.setState({
      listItems: this.state.listItems
    });
    localStorage.setItem('listItems', JSON.stringify(this.state.listItems));

  }
  
  findItem(item) {
    return this.state.listItems.filter((element) => element.name === item)[0];
  }
  
  toggleComplete(item) {
    let selectedItem = this.findItem(item);
    selectedItem.completed = !selectedItem.completed;
    this.setState({ listItems: this.state.listItems });
    localStorage.setItem('listItems', JSON.stringify(this.state.listItems));

  }
  
  saveItem(oldItem, newItem) {
    let selectedItem = this.findItem(oldItem);
    selectedItem.name = newItem;
    this.setState({ listItems: this.state.listItems });
    localStorage.setItem('listItems', JSON.stringify(this.state.listItems));

  }
  
  deleteItem(item) {
    console.log(item)
    let index = this.state.listItems.map(element => element.id).indexOf(item);
    this.state.listItems.splice(index, 1);
    this.setState({ listItems: this.state.listItems });
    localStorage.setItem('listItems', JSON.stringify(this.state.listItems));

    this.setState({multipleDelete:[]})
  }
  deleteMultipleItem(e,id){
  
   const checked = e.target.checked;
    if (checked) {
     //checked
     this.state.multipleDelete.push(id);
    } else {
     
     let index = this.state.multipleDelete.map(element => element).indexOf(id);
     this.state.multipleDelete.splice(index, 1);

    }
  }
  ConfirmDelete = (e) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        // var id = e.target.getAttribute("data-id");
        var id = e.id;

        return (
                  <div className='custom-ui'>
                    <h1>Are you sure?</h1>
                    <p>You want to delete this list?</p>
                    <button onClick={onClose}>No</button>
                    <button onClick={() => {
                        this.handelBulkDelete()
                        onClose()
                    }}>Yes, Delete it!</button>
                  </div>
        )
      }
    }) 
  };

  handelBulkDelete(){
    let bulkDelete=this.state.multipleDelete;  
    if(bulkDelete.length!==0) {
      bulkDelete.map((index ,data)=>{
        console.log(index)
        this.deleteItem(index)

      });
    }
  }
 chnageTag(tagname){
  this.setState({activeTag:tagname})
 }         
  render() {
  
    return (
      <div className="to-do-app">
        <div className="header">
          <h1>ToDo List</h1>
          <div className="row m-0 pl-3">
             <button className={(this.state.activeTag=='all')?'btn-default btn-tag active':'btn-default btn-tag'}
             onClick={this.chnageTag.bind(this,'all')}>All</button>
             <button className={(this.state.activeTag=='react')?'btn-default btn-tag active':'btn-default btn-tag'} onClick={this.chnageTag.bind(this,'react')}>React</button>
             <button className={(this.state.activeTag=='java')?'btn-default btn-tag active':'btn-default btn-tag'} onClick={this.chnageTag.bind(this,'java')}>Java</button>
             <button className={(this.state.activeTag=='pytho============')?'btn-default btn-tag active':'btn-default btn-tag'} onClick={this.chnageTag.bind(this,'python')}>Python</button>

          </div>
        </div>
        <CreateList 
          listItems={this.state.listItems} 
          createItem={this.createItem.bind(this)} 
          ConfirmDelete={this.ConfirmDelete.bind(this)}
           />
        <ToDoList 
           listItems={this.state.listItems} 
           deleteItem={this.deleteItem.bind(this)} 
           saveItem={this.saveItem.bind(this)} 
           toggleComplete={this.toggleComplete.bind(this)} 
           deleteMultipleItem={this.deleteMultipleItem.bind(this)} 
           activeTag={this.state.activeTag}
           />
      </div>
    );
  }
}

export default App;
