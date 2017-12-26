import {createStore} from 'redux';
import rootReducer from '../Reducers/reducer';




export default function configureStore(){
    return createStore(rootReducer);
}
