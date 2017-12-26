module.exports={
  deleteTask : function(key){
    return{
      type: "DELETE_TASK",
      index: key-1

    };
  },
  viewTask : function(key){
    return{
      type: "VIEW_TASK",
      index: key-1
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
    index: key-1,
    title: title,
    text: text
  };
},
  discardTask : function(){
    return{
      type: "DISCARD_TASK"
    }
  }
}
