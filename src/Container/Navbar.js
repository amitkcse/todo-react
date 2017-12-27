import React, { Component } from 'react';
import configureStore from '../Stores/configureStore';
import {connect} from 'react-redux';
import * as action from '../Actions/action';
import {bindActionCreators} from 'redux';

class Navbar extends React.Component{
  constructor(props) {
      super(props);
       this.state = {
          searchText:''
        };
    }
    componentWillReceiveProps(nextProps){
      if(!nextProps.stateCopy.tasks.searchText){
        console.log('navbar',nextProps.stateCopy.searchText, this.state);
        this.setState({
          searchText:''
        },()=>{ console.log('set state done in nav search bar')})
      }
    }
  handleSearchTextChange = event => {
      this.setState({
          searchText: event.target.value,
        },() =>{ this.props.actions.searchTasks(this.state.searchText)});
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
                     <input type="text" className="form-control"
                       placeholder="Search..."onChange={this.handleSearchTextChange}  value={this.state.searchText}  />
                    </form>
                 </div>
             </div>
         </nav>
     )
 }
}
function mapStateToProps(state){
    return {
      stateCopy:state
    }
}
function mapDispatchToProps(dispatch){
    return {
      actions : bindActionCreators(action ,dispatch)
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
