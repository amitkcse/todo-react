module.exports={
  deleteTask : function(key){
    return{
      type: "DELETE_TASK",
      key: key

    };
  },
  viewTask : function(key){
    return{
      type: "VIEW_TASK",
      key: key
    };
  },
  addTask : function(title, text){
    return {
    type: "ADD_TASK",
    title: title,
    text: text
  };

  },
  updateTask: function(key,title,text){
    return {
    type: "UPDATE_TASK",
    key: key,
    title: title,
    text: text
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

  }
}
