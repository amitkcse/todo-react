import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/dashboard.css';
import Overlay from './Container/Overlay.js'
import Navbar from './Container/Navbar';
import TaskForm from './Container/TaskForm.js';
import TaskList from './Container/TaskList';
import configureStore from './Stores/configureStore';
import {Provider} from 'react-redux';
var store =configureStore();
class App extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='container'>
                    <Overlay />
                    <Navbar />
                    <TaskList/>
                    <TaskForm/>
                </div>
            </Provider>
        )
    }
}

export default App;
