import { FC } from "react"; 
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Banks from "../pages/Banks/Banks";
import { privateRoutes, publicRoutes} from "../router/routes";
import { useTypedSelector } from "../hooks/useTypedSelector";
 
const AppRouter: FC = () => {
    const {isAuth} = useTypedSelector(state => state.auth)
    return ( 
        isAuth 
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route path={route.path}
                           element={<route.element />}
                           key={route.path}
                    />
                )}
                <Route path='*' element={<Banks />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route path={route.path}
                        element={<route.element />}
                        key={route.path}
                    />
                )}
                <Route path='*' element={<Login />} />
            </Routes>
    ) 
} 
 
export default AppRouter;