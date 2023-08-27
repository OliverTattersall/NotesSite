import { useState } from "react";
import { NoteModal } from "./NoteModal";

export const Note = ({title, content, fullcontent, id, notebookId, refetch})=>{
    const [modalOpen, setOpen] = useState(false);


    return (
        <>
            <div class="max-w-full w-full">
                <div 
                onClick={()=>{setOpen(true)}}
                className=" mx-auto p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-lg shadow-grey-600 hover:shadow-black mt-4">
                    <div className="inline-block text-2xl font-bold w-1/4 align-top">
                        <p className="float-top">{title}</p>
                        
                    </div>
                    <div className="inline-block w-2/3">
                        {content}
                    </div>
                    
                </div>
                
                
            </div>
            <NoteModal isOpen={modalOpen} updateOpenStatus={setOpen} title={title} content={fullcontent} notebookId={notebookId} noteId={id} refetch={refetch}/>
        </>
    );

}