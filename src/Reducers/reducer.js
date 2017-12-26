import {combineReducers} from 'redux';
var taskJSON=localStorage.taskjson;
var taskData= taskJSON ?JSON.parse(taskJSON):[];

var iniState={ 'Tasks':taskData, 'TaskToView': 'noo'};

const taskReducer = ( state = iniState , action) => {
 switch(action.type){
  case "DELETE_TASK" :
    var TasksCopy = state.Tasks;
    TasksCopy.splice(action.index, 1);
    for(var i=0;i<TasksCopy.length ;i++){
      TasksCopy[i].key=i+1;
    }

    state = {...state, 'Tasks': TasksCopy,TaskToView: 'del'};
    localStorage.taskjson=JSON.stringify(state.Tasks);
    break;

  case "VIEW_TASK" :
     state = {...state, 'TaskToView': action.index};
   break;

  case "ADD_TASK"  :
   var task ={};
   task.key = state.Tasks.length+1;
   task.title = action.title;
   task.text = action.text;
   var TasksCopy = state.Tasks;
   TasksCopy.push(task);
   state = {...state, 'Tasks': TasksCopy, TaskToView: 'no'};
   localStorage.taskjson=JSON.stringify(state.Tasks);
   break;

  case "UPDATE_TASK" :
    var task ={};
    task.key = action.index+1;
    task.title = action.title;
    task.text = action.text;
    var TasksCopy = state.Tasks;
    TasksCopy[action.index]=task;
    state = {...state, 'Tasks': TasksCopy, TaskToView: 'no'};
    localStorage.taskjson=JSON.stringify(state.Tasks);
    break;

    case "DISCARD_TASK" :
    state = { ...state, TaskToView:'no'};

    break;
    default :
     break;
 }
   return state;
}

const rootReducer = combineReducers({
  tasks : taskReducer
});

export default rootReducer;
