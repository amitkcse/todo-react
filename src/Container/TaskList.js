import React, { Component } from 'react';
import Task from '../Components/Task';
import configureStore from '../Stores/configureStore';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import * as action from '../Actions/action';
import {bindActionCreators} from 'redux';
class TaskList extends React.Component{
  constructor(props) {
      super(props);
      this.deleteTask=this.deleteTask.bind(this);
      this.viewTask=this.viewTask.bind(this);
  }

  deleteTask(key){
    this.props.actions.deleteTask(key);
  }
  viewTask(key){
    this.props.actions.viewTask(key);
  }
    render(){
        return(

             <div className="sidebar col-md-2">
                <ul className="list-group">
                    {this.props.stateCopy.Tasks.map(task => (<Task task={task}
                      deleteTask={this.deleteTask} viewTask={this.viewTask} />))}

                </ul>

             </div>


        )
    }

}
function mapStateToProps(state){
  return { stateCopy:state.tasks}
}
function mapDispatchToProps(dispatch){
    return {
      actions : bindActionCreators(action,dispatch)
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(TaskList);
