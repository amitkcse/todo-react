import React, { Component } from 'react';
import configureStore from '../Stores/configureStore';
import {connect} from 'react-redux';
//import {deleteTask,addTask,updateTask,} from '../Actions/action';
import * as action from '../Actions/action';
import {bindActionCreators} from 'redux';

class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        console.log('taskform cons called');
         this.state = {
            title:'',
            text:'',
            key:''
        };
        this.addTask=this.addTask.bind(this);
        this.discardTask=this.discardTask.bind(this);
        this.updateTask=this.updateTask.bind(this);

    }

    componentWillReceiveProps(nextProps){
       if(nextProps.stateCopy.TaskToView)
      console.log('cwrp called but not executed',nextProps.stateCopy.TaskToView, nextProps.stateCopy.Tasks, this.state)
      if(!(isNaN(nextProps.stateCopy.TaskToView))){
        console.log('cwrp called',nextProps.stateCopy.TaskToView, nextProps.stateCopy.Tasks, this.state)
        this.setState({
            title:nextProps.stateCopy.Tasks[nextProps.stateCopy.TaskToView].title,
            text:nextProps.stateCopy.Tasks[nextProps.stateCopy.TaskToView].text,
            key:nextProps.stateCopy.Tasks[nextProps.stateCopy.TaskToView].key
        },()=>{console.log('state after cwrp set state is', this.state)})

      }
      if(nextProps.stateCopy.TaskToView=='del'){
        this.setState({
          title:'',
          text:'',
          key:''
        },()=>{console.log('state after del set state is', this.state)})
      }
    }


    handleTextChange = event => {
        this.setState({
            title:this.state.title,
            text: event.target.value,
            key:this.state.key
        });
    };
    handleTitleChange = event => {
        this.setState({
            title: event.target.value,
            text:this.state.text,
            key:this.state.key

        })
    };
    addTask(){
        if(!this.state.title=='' && !this.state.text==''){
          this.props.actions.addTask(this.state.title, this.state.text);
        this.setState({
            title:'',
            text:'',
            key:''
        });
      } else alert("Both Title and Text field required")

    }
    updateTask(){
      if(!this.state.title=='' && !this.state.text==''){
        this.props.actions.updateTask(this.state.key, this.state.title, this.state.text);
        this.setState({
            title:'',
            text:'',
            key:''
        });
    } else alert("Both Title and Text field required")
  }
    discardTask(){
      console.log('in discard',this.props.stateCopy.Tasks[this.props.stateCopy.TaskToView].title)
        //this.props.actions.deleteTask();
        this.setState({
            title:'',
            text:'',
            key:''
        });
    }
    updateState(){
      if(this.props.stateCopy.TaskToView){
        this.state = {
            title:this.props.stateCopy.Tasks[this.props.stateCopy.TaskToView].title,
            text:this.props.stateCopy.Tasks[this.props.stateCopy.TaskToView].text,
            key:this.props.stateCopy.Tasks[this.props.stateCopy.TaskToView].key
        };
      }
    }
      render(){
      if(this.state.key){
        var divToShow=<div className='row'><button className="btn btn-lg btn-primary " type="button" onClick={this.updateTask.bind(this)}>Update Task</button>
                                           <button className="btn btn-lg btn-primary " type="button" onClick={this.discardTask.bind(this)}>
                                                   <span className='glyphicon glyphicon-remove'></span></button>
                    </div>
      }
       else divToShow=<button className="btn btn-lg btn-primary " type="button" onClick={this.addTask.bind(this)}>Add Task</button>
      return(

        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <form class="form-signin form-group">
            <label for="taskName" className="sr-only">Task Title</label>
              <input type="text" id="taskName" className="form-control" placeholder="Task Title" required
               onChange={this.handleTitleChange} value={this.state.title}/>
           <input type="hidden" id="taskKey" value={this.state.key} />
           <label for="taskDesc" className="sr-only">Description</label>
              <textarea id="taskDesc" classNmae="form-control" rows="10" placeholder="Your Task Description Here"
               onChange={this.handleTextChange} value={this.state.text}> </textarea>

                </form>
                 {divToShow}
            </div>

      )
    }
}
function mapStateToProps(state){
    return {
      stateCopy:state.tasks
    }
}
function mapDispatchToProps(dispatch){
    return {
      actions : bindActionCreators(action ,dispatch)
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
