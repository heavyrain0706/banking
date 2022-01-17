import { FC, useEffect } from "react"; 
import Header from "./components/Header/Header";
import './App.scss';
import AppRouter from "./components/AppRouter";
import { useActions } from "./hooks/useActions";
import { IUser } from "./store/types/IUser";
 
const App: FC = () => { 

    const {setUser, setIsAuth} = useActions()

    useEffect( () => {
        if(localStorage.getItem('auth')) {
            setUser({username: localStorage.getItem('username' || '')} as IUser)
            setIsAuth(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ( 
        <div className="wrapper">
            <Header />
            <AppRouter />
        </div>
    ) 
}
 
export default App;