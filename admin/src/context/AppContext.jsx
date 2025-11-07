import { createContext } from "react";
import {toast} from 'react-toastify'
import axios from 'axios'
export const AppContext = createContext()
const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const currency = '$'
    const value = {
        backendUrl,currency
    }

    return (
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider