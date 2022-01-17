import { FC } from "react"
import { useNavigate } from "react-router"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { RouteNames } from "../../router/routes"
import classes from './Header.module.scss'

const Header: FC = () => {

    const navigate = useNavigate()
    const {isAuth, user} = useTypedSelector(state => state.auth)
    const {logout} = useActions()

    return (
        <header className={classes.header}>
            {isAuth
                ?
                <>
                    <div className={classes.header__username}>{user.username}</div>
                    <button className={classes.header__authButton} onClick={logout}>Выйти</button></>
                :
                <button className={classes.header__authButton} onClick={() => navigate(RouteNames.LOGIN)}>Войти</button>

            }
        </header>

    ) 
} 
 
export default Header;