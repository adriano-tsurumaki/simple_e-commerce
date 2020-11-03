import { createStore } from 'redux';

const INITIAL_STATE = {
    total: 0,
    id: 0,
    list: [],
}

function reducer(state = INITIAL_STATE, action) {

    if(action.type === "ADD_MESSAGE") {
        let { total, list, id } = state;
        list.push({
            id,
            type_alert: action.alert,
            msg: action.msg,
            setTimer: action.setTimer
        });
        total = list.length;
        id++;
        return {
            total,
            id,
            list
        }
    }

    if(action.type === "REMOVE_MESSAGE") {
        let { total, list, id } = state;

        list = list.filter(item => item.id !== action.id);
        total = list.length;

        return {
            total,
            id,
            list
        }
    }

    if(action.type === "SET_TIMER_MESSAGE") {
        let { total, list, id } = state;
        list = list.map(item => {
            if(!item.setTimer) {
                return {...item, setTimer: true}
            }
            return item;
        });

        return { 
            total,
            id,
            list
        };
    }

    return state;
}

const store = createStore(reducer);

export default store;