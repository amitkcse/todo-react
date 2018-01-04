module.exports={
  changeLoadingState: function(){
    return{
      type:  "CHANGE_LOADING_STATE"
    }
  },
  deleteTask : function(_id){
    return{
      type: "DELETE_TASK",
      _id: _id

    };
  },
  loadAllTask : function(taskData){
    return {
      type: "LOAD_TASK",
      taskData: taskData
    }
  },
  viewTask : function(_id){
    return{
      type: "VIEW_TASK",
      _id: _id
    };
  },
  addTask : function(task){
    return {
    type: "ADD_TASK",
    task: task
  };

  },
  updateTask: function(task){
    return {
    type: "UPDATE_TASK",
    task: task
  };
},
  discardTask : function(){
    return{
      type: "DISCARD_TASK"
    }
  },
  discardSearch : function(){
    return {
      type: "DISCARD_SEARCH"
    }
  },
  searchTasks : function(searchText){
    return {
      type: "SEARCH_TASKS",
      searchText : searchText
    }
  },
  updateTitle : function(taskTitle){
    return {
      type: "UPDATE_TASK_TITLE",
      taskTitle: taskTitle
    }
  },
  updateText : function(taskText){
    return {
      type: "UPDATE_TASK_TEXT",
      taskText: taskText
    }
  }
}
