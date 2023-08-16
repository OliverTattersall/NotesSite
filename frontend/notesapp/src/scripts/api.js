import axios from "axios"

export const fetchNotebooks = async () => {
    return await axios.get('http://127.0.0.1:8000/api/notebooks/')
    
}

export const fetchNotebook = async ({queryKey}) =>{
    const [_, id] = queryKey;
    console.log(id)
    return await axios.get(`http://127.0.0.1:8000/api/notebooks/${id}/`)
    // return await axios.get('http://127.0.0.1:8000/api/notebooks/1/')
}

export const submitNotebook = (notebookTitle) => async () =>{
    console.log(notebookTitle)
    return await axios.post('http://127.0.0.1:8000/api/notebooks/', {title: notebookTitle})
}


export const deleteNote = async (id) => {

    console.log(id)

    return await axios.delete(`http://127.0.0.1:8000/api/notes/${id}/`)
}

export const submitNote = async (noteTitle, noteDescription, notebookId) => {

    return await axios.post(`http://127.0.0.1:8000/api/notes/`, {title:noteTitle, description:noteDescription, notebook:notebookId})
}

export const editNote = async (id, noteTitle, noteDescription, notebookId) => {


    return await axios.put(`http://127.0.0.1:8000/api/notes/${id}/`, {title:noteTitle, description:noteDescription, notebook:notebookId})

}
