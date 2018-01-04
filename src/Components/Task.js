import React from 'react';
class Task extends React.Component{
    viewTask(_id){
      this.props.viewTask(_id)
    }

    deleteTask(_id){
       this.props.deleteTask(_id);
    }
    render(){
        return(
          <div>
            <li className=" list-group-item" ><button className="btn btn-sm " onClick=
                {this.viewTask.bind(this, this.props.task._id)} >{this.props.task.title}</button>
              <button className="btn btn-sm btn-danger" onClick={this.deleteTask.bind(this, this.props.task._id)} >
                    <span className="glyphicon glyphicon-trash "></span></button></li>
          </div>

        )
    }

}
export default Task;
