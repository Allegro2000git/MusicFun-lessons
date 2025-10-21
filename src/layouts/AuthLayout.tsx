import {Outlet} from "react-router";

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