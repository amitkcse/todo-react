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
  discardSearch(){
    console.log('discard search called in tasklist');
     this.props.actions.discardSearch();
  }

  deleteTask(key){
    this.props.actions.deleteTask(key);
  }
  viewTask(key){
    this.props.actions.viewTask(key);
  }
    render(){
       if(this.props.stateCopy.searchText){
         console.log('inside if in tasklist ender')
         var searchDiscard = <button className="btn btn-lg btn-primary " type="button" onClick={this.discardSearch.bind(this)}>
                 <span className='glyphicon glyphicon-remove'></span></button>
       }
        return(

             <div className="sidebar col-md-2">
                {searchDiscard}
                <ul className="list-group">
                    {this.props.stateCopy.TaskListToView.map(task => (<Task task={task}
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
