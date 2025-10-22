import type {FormEvent} from "react";
import {useUploadTrack} from "../model-segment/useUploadTrack";


export const UploadTrackForm = () => {
    const {isError, isPending, error, mutate} = useUploadTrack()

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
       const form = e.currentTarget
       const formData = new FormData(form)
       const entries = formData.entries()
       const values = Object.fromEntries(entries)
       mutate(values as any, {
           onSuccess: () => {
               form.reset()
           }
       })
   }

    return (
        <form onSubmit={handleSubmit}>
            {isError && <div style={{color: "red"}}>{JSON.stringify(error.message)}</div>}
            <div>
                <input name={'title'}/>
            </div>
            <div>
                <input name={'file'} type={'file'}/>
            </div>
            <div>
                <button disabled={isPending} type={'submit'}>Upload</button>
            </div>

        </form>
    )
}