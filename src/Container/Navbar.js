import React from 'react';
import {connect} from 'react-redux';
import * as action from '../Actions/action';
import {bindActionCreators} from 'redux';

class Navbar extends React.Component{

  handleSearchTextChange = event => {
        this.props.actions.searchTasks(event.target.value);
  };

 render(){
  return(
    <nav className="navbar navbar-inverse navbar-fixed-top" >
     <div className="container">
      <div className="navbar-header">
       <a className="navbar-brand" href="#">TO-DO APP</a>
       </div>
      <div id="navbar" className="navbar-collapse collapse">
        <form className="navbar-form navbar-right">
         <input type="text" className="form-control" placeholder="Search..."
          onChange={this.handleSearchTextChange}
          value={this.props.searchText}  />
       </form>
      </div>
    </div>
   </nav>
  )
 }
}
function mapStateToProps(state){
    return {
      searchText:state.tasks.searchText
    }
}
function mapDispatchToProps(dispatch){
    return {
      actions : bindActionCreators(action ,dispatch)
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
