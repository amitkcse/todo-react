import {combineReducers} from 'redux';
var taskJSON=localStorage.taskjson;
var taskData= taskJSON ?JSON.parse(taskJSON):[];

var iniState={ 'Tasks':taskData, TaskListToView: taskData, 'TaskToView': 'no', searchText:'', searchResult: []};
// function to search Task with key and return index of Task
function searchTask(key, TasksCopy){
  for (var i=0; i < TasksCopy.length; i++) {
      if (TasksCopy[i].key === key) {
          return i;
          break;
      }
  }
}

const taskReducer = ( state = iniState , action) => {
 switch(action.type){

  case "DELETE_TASK" :
    var TasksCopy = state.Tasks;
    var taskIndex = searchTask(action.key, TasksCopy);
    console.log('in delete index is', taskIndex,'and key is', action.key);
    TasksCopy.splice(taskIndex, 1);
    state = {...state, 'Tasks': TasksCopy, TaskListToView: TasksCopy ,TaskToView: 'del'};
    localStorage.taskjson=JSON.stringify(state.Tasks);
    break;

  case "VIEW_TASK" :
    var TasksCopy = state.Tasks;
    var taskIndex = searchTask(action.key, TasksCopy);
    state = {...state, 'TaskToView': taskIndex};
    break;

  case "ADD_TASK"  :
   var task ={};
   //task.key = state.Tasks.length+1;
   task.key = '_'+(Math.random().toString(36).substr(2,9));
   task.title = action.title;
   task.text = action.text;
   var TasksCopy = state.Tasks;
   TasksCopy.push(task);
   state = {...state, 'Tasks': TasksCopy,  TaskListToView: TasksCopy, TaskToView: 'no'};
   localStorage.taskjson=JSON.stringify(state.Tasks);
   break;

  case "UPDATE_TASK" :
    var task ={};
    task.key = action.key;
    task.title = action.title;
    task.text = action.text;
    var TasksCopy = state.Tasks;
    var taskIndex = searchTask(action.key, TasksCopy);
    TasksCopy[taskIndex]=task;
    state = {...state, 'Tasks': TasksCopy, TaskListToView: TasksCopy, TaskToView: 'no'};
    localStorage.taskjson=JSON.stringify(state.Tasks);
    break;

  case "DISCARD_TASK" :
    state = { ...state, TaskToView:'no'};

    break;
    default :
     break;

  case "DISCARD_SEARCH" :
      console.log('discard search called in educer');
      state ={ ...state, searchText: '',  TaskListToView: state.Tasks, searchResult: []};
      break;

  case "SEARCH_TASKS" :
     var searchText= action.searchText;
     var searchResult =[];
     var TasksCopy = state.Tasks;
     function searchTextInTasks(searchTerm, Tasks){
       for(var i=0;i<Tasks.length; i++){
        if(Tasks[i].title.indexOf(searchTerm)  !== -1 || Tasks[i].text.indexOf(searchTerm)  !== -1 ){
         if(searchResult.indexOf(Tasks[i]) == -1){
          searchResult.push(Tasks[i]);
         }
        }
       }
      }

      searchTextInTasks(searchText, TasksCopy);
      var searchTermsSplitted = searchText.split(' ');
      searchTermsSplitted.forEach(
        function(searchTermSplitted){
          if(searchTermSplitted.trim()){
            searchTextInTasks(searchTermSplitted, TasksCopy);
          }
          }
       )
       state ={ ...state, searchText: searchText, TaskListToView: searchResult, searchResult: searchResult};
       console.log('search task', state)
 }
   return state;
}

const rootReducer = combineReducers({
  tasks : taskReducer
});

export default rootReducer;
