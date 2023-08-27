import { useState } from "react";
import Modal from "react-modal";
import { newNotebook, submitNotebook } from "../scripts/api";

const styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
}

export const NewNotebookModal = ({isOpen, updateOpenStatus, refetch}) =>{
    
    const [title, updateTitle] = useState('');

    const handleSubmit = () => {
        const submitPromise = newNotebook(title)
        submitPromise.then(() => {
            updateOpenStatus(false)
            refetch();
        })
    }

    return (
        <>
            <Modal 
                isOpen={isOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={()=>{updateOpenStatus(false); updateTitle('')}}
                style={styles}
                // contentLabel="Example Modal"
            >
                <h1 className="text-2xl font-bold">Create a new Notebook</h1>
                <div className="max-w-sm mt-3">
                    <label for="title">Notebook Title</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="title" 
                    type="text" 
                    placeholder="Title" 
                    value={title}
                    onChange={(e)=>{updateTitle(e.target.value);}}
                    />
                    <button 
                    className="mt-4 shadow bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    type="button"
                    onClick={handleSubmit}
                    >Submit</button>
                </div>
            </Modal>
            
        </>
    );
}