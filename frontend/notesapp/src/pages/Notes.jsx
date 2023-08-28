import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { getNotebook } from "../scripts/api"
import { Note } from "../components/Note";
import { useEffect, useState } from "react";
import { NewNoteModal } from "../components/NewNoteModal";


export const Notes = ()=>{
    const navigate = useNavigate()
    const {id} = useParams();
    const {data,  refetch, error, isError} = useQuery({queryFn: getNotebook, queryKey:['id',id], retry:1})
    const [openNewNoteModal, setOpen] = useState(false)
    // console.log(data?.data, data?.data.notes.slice().reverse())

    useEffect(()=>{
        console.log(error, isError)
        if(error?.response.status === 403){
            navigate('/auth/')
        }
    }, [isError, error])

    const cleanContent = (content) => {
        if(content.length > 250){
            return content.slice(0,250) + ' ...'
        }

        return content
    }

    return (
        <div>
            <h1 className="text-center text-2xl mt-10 underline">Notes</h1>
            <div className="float-right mr-8">
                <p>New Note</p>
                <button onClick={()=>{setOpen(true)}} class="p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none" type="button">
                    <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
                        <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                                C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                                C15.952,9,16,9.447,16,10z" />
                    </svg>
                </button>
            </div>
            <NewNoteModal isOpen={openNewNoteModal}  updateOpenStatus={setOpen} notebookId={id} refetch={refetch}/>
            <div className="max-w-lg mx-auto">
                {data?.data.notes.slice().reverse().map((note) => {
                    // console.log(note)
                    return <Note id={note.id} title={note.title} fullcontent={note.description} content={cleanContent(note.description)} notebookId={id} refetch={refetch}/>
                })}
            </div>
        </div>
    )
}