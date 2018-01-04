import React from 'react';
import {connect} from 'react-redux';
import * as action from '../Actions/action';
import {bindActionCreators} from 'redux';
import '../css/overlay.css';

class Overlay extends React.Component{


 render(){
   if(this.props.stateCopy.isLoading=='true'){
     var divToShow=<div id="overlay"></div>
   }
  return(
    <div>
    <div id="overlay"></div>
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


export default connect(mapStateToProps,mapDispatchToProps)(Overlay);
