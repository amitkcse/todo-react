import {combineReducers} from 'redux';


var iniState = { Tasks:[], TaskListToView:[], taskTitle:'', taskText: '',
                _id:'', searchText:'', searchResult: [], isLoading: true};

function searchTask(_id, TasksCopy){
  for (var i=0; i < TasksCopy.length; i++) {
     if (TasksCopy[i]._id === _id) {
      return i;
     }
   }
 }


const taskReducer = ( state = iniState , action) => {
 switch(action.type){
   case "CHANGE_LOADING_STATE":
     state={...state, isLoading:'true'};
     break;

  case "LOAD_TASK" :
  var TaskCopy = action.taskData;
  state = {...state, Tasks: TaskCopy, TaskListToView: TaskCopy, isLoading: 'false'};
  break;

  case "DELETE_TASK" :
   console.log('delete_task called', action);
   var TasksCopy = state.Tasks;
   var taskIndex = searchTask(action._id, TasksCopy);
   TasksCopy.splice(taskIndex, 1);
   state = {...state, Tasks: TasksCopy, taskTitle:'', taskText: '', _id:'', isLoading: 'false',
   TaskListToView: TasksCopy, searchResult: []};
   break;

  case "VIEW_TASK" :
    TasksCopy = state.Tasks;
    taskIndex = searchTask(action._id, state.Tasks);
    state = {...state, taskTitle:state.Tasks[taskIndex].title ,
      taskText:state.Tasks[taskIndex].text , _id: state.Tasks[taskIndex]._id, isLoading: 'false' };
    break;

  case "ADD_TASK"  :
   var task = action.task;
   TasksCopy = state.Tasks;
   TasksCopy.push(task);
   state = {...state, Tasks: TasksCopy, TaskListToView: TasksCopy,
             taskTitle:'', taskText: '', isLoading: 'false' };

      break;

  case "UPDATE_TASK" :
   console.log('update_task called', action);
    task =action.task;
    TasksCopy = state.Tasks;
    taskIndex = searchTask(task._id, TasksCopy);
    TasksCopy[taskIndex] = task;
    state = {...state, Tasks: TasksCopy, TaskListToView: TasksCopy,
                     taskTitle:'', taskText: '', _id : '', isLoading: 'false'};
    break;

  case "DISCARD_TASK" :
   console.log('discard_task called', action);
    state = { ...state, taskTitle:'', taskText: '', _id : '', isLoading: 'false'};
    break;

  case "UPDATE_TASK_TITLE" :
       console.log('update_task_title', action);
      var taskTitle=action.taskTitle;
      state = { ...state, taskTitle: taskTitle, isLoading: 'false'};
      console.log('in state taskTitle is', state.taskTitle)
      break;

  case "UPDATE_TASK_TEXT" :
      var taskText = action.taskText;
      state = { ...state, taskText : taskText};
      break;

  case "DISCARD_SEARCH" :
      state ={ ...state, searchText: '', TaskListToView: state.Tasks,
               searchResult: []};
      break;

  case "SEARCH_TASKS" :
     var searchText= action.searchText;
     var searchResult =[];
     TasksCopy = state.Tasks;
     function searchTextInTasks(searchTerm, Tasks){
       for(var i=0;i<Tasks.length; i++){
        if(Tasks[i].title.indexOf(searchTerm)  !== -1 ||
              Tasks[i].text.indexOf(searchTerm)  !== -1 ){
         if(searchResult.indexOf(Tasks[i]) == -1){
          searchResult.push(Tasks[i]); }}}}
     searchTextInTasks(searchText, TasksCopy);
     var searchTermsSplitted = searchText.split(' ');
     searchTermsSplitted.forEach(
        function(searchTermSplitted){
          if(searchTermSplitted.trim()){
            searchTextInTasks(searchTermSplitted, TasksCopy);
          }
        })
    state ={ ...state, searchText: searchText, TaskListToView: searchResult,
              searchResult: searchResult};
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
