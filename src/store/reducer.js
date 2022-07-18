import { ADD_TODO, SET_TODO_INPUT, DELETE_TODO, UPDATE_TODO, UPDATE_CHECKBOX, UPDATE_DATA } from "./constants";

const initState = {
    todos: [],
    todoInput: ''
}

//Save to local storage
const saveToLocal = (listJobs) => {
    const newJson = JSON.stringify(listJobs);
    localStorage.setItem('jobs', newJson);
}
function reducer(state, action) {
    let listJobs = {};
    let newTodos = [];
    switch (action.type) {
        case SET_TODO_INPUT:
            listJobs = {
                ...state,
                todoInput: action.payload
            }
            break;
        case ADD_TODO:
            if (action.payload) {
                listJobs = {
                    ...state,
                    todos: [...state.todos,
                    {
                        work: action.payload,
                        status: false
                    }]
                }
            }else{
                listJobs = {
                    ...state
                }
            }
            break;
        case DELETE_TODO:
            newTodos = [...state.todos];
            newTodos.splice(action.payload, 1)

            listJobs = {
                ...state,
                todos: newTodos
            }
            break;

        case UPDATE_TODO:
            const { indexChange, todoInput } = action.payload;
            state.todos[indexChange.current].work = todoInput;
            listJobs = {
                ...state
            }
            break;
        case UPDATE_CHECKBOX:
            newTodos = [...state.todos];
            newTodos[action.payload.index].status = action.payload.status
            listJobs = {
                ...state,
                todos: newTodos
            }
            break;
        case UPDATE_DATA:
            newTodos = [...state.todos];
            let obj = newTodos[action.payload.startIndex];

            //Add item to mouse drop
            newTodos.splice(action.payload.dropIndex,0,obj)
            if (action.payload.startIndex > action.payload.dropIndex) {
                action.payload.startIndex++;
            }

            //Delete item droped
            newTodos.splice(action.payload.startIndex,1)

            listJobs = {
                ...state,
                todos: newTodos
            }
            break;
        default:
            throw new Error('Invalid action!')
    }
    //save to local storage
    saveToLocal(listJobs)
    return listJobs;
}

export { initState }
export default reducer