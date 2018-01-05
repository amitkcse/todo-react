import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/dashboard.css';
import Overlay from './Container/Overlay.js'
import Navbar from './Container/Navbar';
import TaskForm from './Container/TaskForm.js';
import TaskList from './Container/TaskList';
import configureStore from './Stores/configureStore';
import {Provider} from 'react-redux';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

const socket = io.connect('http://192.168.0.97:3051');
var store =configureStore();
class App extends React.Component {
    render(){
        return(
            <Provider store={store}>
              <SocketProvider socket={socket}>
                <div className='container'>
                    <Overlay />
                    <Navbar />
                    <TaskList/>
                    <TaskForm/>
                </div>
              </SocketProvider>
            </Provider>
        )
    }
}

export default App;
