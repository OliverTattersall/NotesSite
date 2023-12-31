import { Notebook } from "../components/Notebook"
import { useQuery } from "react-query"
import axios from "axios"
import { useEffect, useState } from "react"
import { NewNotebookModal } from "../components/NewNotebookModal";
import { fetchNotebooks, getUserNotebooks, logout, submitNotebook } from "../scripts/api";
import { useNavigate } from "react-router-dom";
// import ReactModal from "react-modal";


// const notebooks=[{'title':'test1', 'id':1, "notes": [
//     {
//         "id": 3,
//         "title": "Test 1",
//         "description": "Test 1"
//     },
//     {
//         "id": 4,
//         "title": "Test 2",
//         "description": "jajSDHJKAJSD"
//     }
// ]}, {'title':'test2', 'id':2, "notes" : []},]





export const Notebooks = ()=>{
    // const {data, refetch} = useQuery({queryFn:fetchNotebooks})
    const {data, refetch, error, isError, failureCount} = useQuery({queryFn: getUserNotebooks, retry:1})
    // notebooks.map((notebook)=>{console.log(notebook); return notebook})
    // console.log(data?.data)
    const [modalOpen, setOpen] = useState(false);
    const navigate = useNavigate()

    console.log(failureCount)
    useEffect(()=>{
        console.log(error, isError)
        if(error?.response.status === 403){
            navigate('/auth/')
        }
    }, [isError, error])

    const handleLogout = ()=>{
        const logoutPromise = logout()
        logoutPromise.then((data)=>{
            navigate('/auth/')
        })
    }

    return (
        <>
            <div className="mx-auto">
                <div className="">
                    <h1 className="text-center text-2xl mt-10 underline">Notebooks</h1>
                    <div className="float-right mr-8">
                        <button onClick={handleLogout} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded float-right" type="button">Logout</button>
                        <br />
                        <div className="mt-8">
                            <p>New Notebook</p>
                            <button onClick={()=>setOpen(true)} className="p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none" type="button">
                                <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" className="w-6 h-6 inline-block">
                                    <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                                            C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                                            C15.952,9,16,9.447,16,10z" />
                                </svg>
                            </button>
                        </div>
                        
                    </div>
                </div>
                <div className="w-3/4 mx-auto">
                    {/* {notebooks.map((notebook) => { */}
                    {data?.data.user.notebooks.map((notebook) =>{ 
                            return <Notebook title={notebook.title} id={notebook.id} key={notebook.id} refetch={refetch}/>
                    })}
                </div>
                
            </div>
            
            <NewNotebookModal isOpen={modalOpen} updateOpenStatus={setOpen} refetch={refetch}/>
    
            
        </>
    )
}