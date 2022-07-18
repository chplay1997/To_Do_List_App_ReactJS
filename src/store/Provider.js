import { useReducer } from 'react'
import Context from "./Context";
import reducer, { initState } from './reducer';


function Provider({ children }) {
    //Get data in localStorage
    const storageJobs = JSON.parse(localStorage.getItem('jobs'));
    const [state, dispatch] = useReducer(reducer, (storageJobs ?? initState))
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider