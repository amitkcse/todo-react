import React, { Component } from 'react';
class Task extends React.Component{
    viewTask(key){
      console.log('viewTask  called in task.js', key)
        this.props.viewTask(key)
    }

    deleteTask(key){
       this.props.deleteTask(key);
    }
    render(){
        return(
          <div>
            <li className=" list-group-item" ><button className="btn btn-sm " onClick=
                {this.viewTask.bind(this, this.props.task.key)} >{this.props.task.title}</button>
                <button class="btn btn-sm btn-danger" onClick={this.deleteTask.bind(this, this.props.task.key)} >
                    <span className="glyphicon glyphicon-trash "></span></button></li>
          </div>

        )
    }

}
export default Task;
