import React from 'react';
import Task from '../Components/Task';
import { socketConnect } from 'socket.io-react';
import {connect} from 'react-redux';
import * as action from '../Actions/action';
import {bindActionCreators} from 'redux';
var axios = require('axios');
var baseUrl = 'http://192.168.0.97:3051';

class TaskList extends React.Component{
  constructor(props){
    super(props);
    this.props.socket.on('task-deleted', (deletedTask) => {
      this.props.actions.deleteTask(deletedTask._id);
      if(this.props.stateCopy.searchText){
        this.props.actions.searchTasks(this.props.stateCopy.searchText);
      }
    })

  }


  componentDidMount() {
    this.loadAllTask();
  }

  discardSearch(){
       this.props.actions.discardSearch();
  }

  loadAllTask(){
    this.props.actions.changeLoadingState();
    axios.post(baseUrl+'/view-tasks')
        .then((response)=>{
         var taskData= response.data ?response.data:[];
         this.props.actions.loadAllTask(taskData);
       })
       .catch((error)=>{
         alert('Someting wrong happened',error.response);
       })
  }

  deleteTask(_id){
    this.props.actions.changeLoadingState();
    var data = {_id: _id};
    this.props.socket.emit('delete-task', data);
    this.props.actions.deleteTask(_id);

  }

  viewTask(_id){
    this.props.actions.viewTask(_id);
  }
    render(){
           if(this.props.stateCopy.searchText){
               var searchDiscard = <button className="btn btn-lg btn-primary "
                 type="button" onClick={this.discardSearch.bind(this)}>
                 <span className='glyphicon glyphicon-remove'></span></button>
       }
        return(

             <div className="sidebar col-md-2">
                {searchDiscard}
                <ul className="list-group">
                    {this.props.stateCopy.TaskListToView.map(task => (<Task task={task}
                      deleteTask={this.deleteTask.bind(this)} viewTask={this.viewTask.bind(this)} />))}

                </ul>

             </div>


        )
    }

}
function mapStateToProps(state){
  return {
    stateCopy: state.tasks
  }
}
function mapDispatchToProps(dispatch){
    return {
      actions : bindActionCreators(action,dispatch)
    };
}


export default socketConnect(connect(mapStateToProps,mapDispatchToProps)(TaskList));
