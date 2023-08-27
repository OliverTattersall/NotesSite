import { useState } from "react";
import Modal from "react-modal";
import { newNotebook, submitNote } from "../scripts/api";


const styles={
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width:'50%',
      },
}

export const NewNoteModal = ({isOpen, updateOpenStatus, refetch, notebookId}) =>{
    const [editableTitle, setTitle] = useState('');
    const [editableDescription, setDescription] = useState('');

    const handleSave = ()=>{
        const submitPromise = submitNote(editableTitle, editableDescription, notebookId);
        submitPromise.then(()=>{
            updateOpenStatus(false)
            refetch();
            setTitle('');
            setDescription('');
        })
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={()=>{updateOpenStatus(false)}}
            style={styles}
        >
                <div>
                    <div className="mt-4">
                        <label for="title" className="text-2xl">Note Title</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="title" 
                        type="text" 
                        placeholder="Title" 
                        value={editableTitle}
                        onChange={(e)=>{setTitle(e.target.value);}}
                        />
                    </div>
                    <div className="mt-4">
                        <label for="description" className="text-2xl">Description</label>
                        <textarea 
                        id="description"
                        placeholder="Description"
                        className="p-2.5 h-36 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        value={editableDescription}
                        onChange={(e)=>{setDescription(e.target.value);}}
                        />
                    </div>
                    <button onClick={()=>{updateOpenStatus(false)}} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                    <button onClick={handleSave} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">Submit</button>
                    
                    
                </div>    


        </Modal>
    );

}