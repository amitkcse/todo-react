import React from 'react';
import { socketConnect } from 'socket.io-react';
import {connect} from 'react-redux';
import * as action from '../Actions/action';
import {bindActionCreators} from 'redux';
var axios = require('axios');
var baseUrl = 'http://localhost:3051';


class TaskForm extends React.Component {
    constructor(props){
      super(props);
      this.props.socket.on('task-added', (createdTask) => {
        this.props.actions.addTask(createdTask);
        if(this.props.searchText){
          this.props.actions.searchTasks(this.props.searchText);
        }
      })
      this.props.socket.on('task-updated', (updatedTask) => {
        this.props.actions.updateTask(updatedTask);
        if(this.props.searchText){
          this.props.actions.searchTasks(this.props.searchText);
        }

      })
    }



    handleTextChange = event => {
        this.props.actions.updateText(event.target.value);
    };
    handleTitleChange = event => {
        this.props.actions.updateTitle(event.target.value);
    };


    addTask(){
       if(!this.props.taskTitle == '' && !this.props.taskText == ''){
         this.props.actions.changeLoadingState();
         var data ={ title: this.props.taskTitle, text: this.props.taskText };
         console.log('add-task called')
         this.props.socket.emit('add-task', data);
       }else alert("Both Title and Text field required");
    }
    updateTask(){
      if( !this.props._id =='' && !this.props.taskTitle == '' && !this.props.taskText == ''){
        this.props.actions.changeLoadingState();
        var data ={ title: this.props.taskTitle, text: this.props.taskText, _id: this.props._id };
        this.props.socket.emit('update-task', data);
      
        } else alert("Both Title and Text field required");
    }

    discardTask(){
        this.props.actions.discardTask();
    }

    render(){
      if(this.props._id){
        var divToShow = <div className='row'><button className="btn btn-lg btn-primary "
            type="button" onClick={this.updateTask.bind(this)}>Update Task</button>
           <button className="btn btn-lg btn-primary " type="button" onClick={this.discardTask.bind(this)}>
             <span className='glyphicon glyphicon-remove'></span></button>
        </div>
       }
       else divToShow = <button className="btn btn-lg btn-primary " type="button"
                  onClick={this.addTask.bind(this)}>Add Task</button>
      return(

        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <form className="form-signin form-group">
            <label htmlFor="taskName" className="sr-only">Task Title</label>
            <input type="text" id="taskName" className="form-control" placeholder="Task Title"
               onChange={this.handleTitleChange} value={this.props.taskTitle}/>
            <input type="hidden" id="taskKey" value={this.props._id} />
            <label htmlFor="taskDesc" className="sr-only">Description</label>
            <textarea id="taskDesc" className="form-control" rows="10" placeholder="Your Task Description Here"
               onChange={this.handleTextChange} value={this.props.taskText}> </textarea>

          </form>
          {divToShow}
        </div>
      )
    }
}
function mapStateToProps(state){
    return {
      taskTitle: state.tasks.taskTitle,
      taskText:  state.tasks.taskText,
      _id     : state.tasks._id,
      searchText: state.tasks.searchText
    }
}
function mapDispatchToProps(dispatch){
    return {
      actions : bindActionCreators(action ,dispatch)
    };
}


export default socketConnect(connect(mapStateToProps,mapDispatchToProps)(TaskForm));
