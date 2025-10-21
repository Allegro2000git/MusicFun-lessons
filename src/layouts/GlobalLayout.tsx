import s from "../App.module.css";
import {NavLink, Outlet} from "react-router";

const NavBarMenuItem = ({to, title}: { to: string, title: string }) => {
    return (
        <NavLink className={({isActive}) => isActive ? s.active : ""} to={to}>{title}</NavLink>
    )
}
export const GlobalLayout = () => {

    return (<div>
        <header className={s.active}>
            <NavBarMenuItem to={"/"} title={"Main"}/>
            <NavBarMenuItem to={`/auth/login`} title={"Login"}/>
            <NavBarMenuItem to={`/auth/register`} title={"Register"}/>
        </header>
        <Outlet/>
        <footer>footer from global layout</footer>
    </div>)
}