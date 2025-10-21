import {useParams} from "react-router";

export const LoginPage = () => {
    let {lang} = useParams()
    if (!lang) lang = "en"

    return (
        <div>
            lang: {lang}
            <hr/>
            <input/>
            <input/>
            <button>Login</button>
        </div>
    )
}