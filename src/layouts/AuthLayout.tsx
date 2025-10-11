import {NavLink, Outlet, useParams} from "react-router";
import s from "../App.module.css";

export const AuthLayout = () => {
    return (
        <div>
            <header>Login or registation from layout</header>
            <Outlet/>
            <footer>
                footer from layout
            </footer>
        </div>
    )
}

const NavBarMenuItem = ({to, title}) => {
    return (
        <NavLink className={({ isActive }) => isActive ? s.active : ""} to={to}>{title}</NavLink>
    )
}

export const GlobalLayout = () => {

    const params = useParams()
    let lang = params["lang"]
    if (!lang) lang =  "en"

    return (<div>
        <header className={s.active}>
            <NavBarMenuItem to={"/"} title={"Main"}/>
            <NavBarMenuItem to={`/${lang}/auth/login`} title={"Login"}/>
            <NavBarMenuItem to={`/${lang}/auth/register`} title={"Register"}/>
        </header>
        <Outlet/>
        <footer>footer from global layout</footer>
    </div>)
}