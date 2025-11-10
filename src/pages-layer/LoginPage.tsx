import {type SubmitHandler, useForm} from "react-hook-form";
import z from "zod/v4"
import {zodResolver} from "@hookform/resolvers/zod";
import {useMeQuery} from "../features-layer/auth-slice/model/useMeQuery";
import {useNavigate} from "react-router";
import {useLoginMutation} from "../features-layer/auth-slice/model/useLoginMutation";

const loginInputsSchema = z.object({
    login: z.string({message:"should be a string"}).min(1),
    password: z.string().min(3, 'Min is 3')
})

type LoginInputs = z.infer<typeof loginInputsSchema>


export const LoginPage = () => {

    const {data} = useMeQuery()
    const {mutateAsync} = useLoginMutation()


    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors}, setError} = useForm<LoginInputs>({resolver: zodResolver(loginInputsSchema)})

    const handleSubmitChange: SubmitHandler<LoginInputs> = async (inputs) => {
        try {
            const data = await mutateAsync(inputs)
            navigate('/profile/' + data!.userId)
        } catch {
            setError('login', {message: 'Incorrect login or password'})
        }
    }
        if (data) return <div>go away from login</div>

        return (
            <form onSubmit={handleSubmit(handleSubmitChange)}>
                <div>
                    <div>
                        <input {...register('login', {required: true})}/>
                        {errors.login && <span>{errors.login.message}</span>}
                    </div>
                    <div>
                        <input type={'password'} {...register('password', {required: true})}/>
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <button>Login</button>
                </div>
            </form>

        )
    }