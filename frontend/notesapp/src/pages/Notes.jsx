import { useParams } from "react-router-dom"


export const Notes = ()=>{
    const {id} = useParams()
   
    return (
        <div>
            Hello
            {id}
        </div>
    )
}