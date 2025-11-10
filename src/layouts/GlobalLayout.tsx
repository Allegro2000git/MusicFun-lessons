import s from "../App.module.css";
import {NavLink, Outlet} from "react-router";
import {useMeQuery} from "../features-layer/auth-slice/model/useMeQuery";
import {useQueryClient} from "@tanstack/react-query";
import {authStorage} from "../shared-layer/libs-segment/authStorage";

const NavBarMenuItem = ({to, title}: { to: string, title: string }) => {
    return (
        <NavLink className={({isActive}) => isActive ? s.active : ""} to={to}>{title}</NavLink>
    )
}
export const GlobalLayout = () => {

    const {data, isLoading, isError} = useMeQuery()
    const queryClient = useQueryClient()

    const handleLogoutClick = () => {
        authStorage.removeBasicCredentials()
        queryClient.resetQueries({
            queryKey: ['auth']
        })
    }

    return (<div>
        <header className={s.active}>
            <NavBarMenuItem to={"/"} title={"Main"}/>
            {!data && !isLoading && <NavBarMenuItem to={`/auth/login`} title={"Login"}/>}
            {isError && <NavBarMenuItem to={`/auth/register`} title={"Register"}/>}
            {data && <NavBarMenuItem to={`/profile/` + data.userId} title={`${data.login}`}/>}
            {data && <button onClick={handleLogoutClick}>Logout</button>}

        </header>
        <Outlet/>
        <footer>footer from global layout</footer>
    </div>)
}