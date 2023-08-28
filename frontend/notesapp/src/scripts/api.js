import axios from "axios"
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


export const getUserNotebooks = async () => {
    return await client.get('/api/user')
}

export const newNotebook = async (notebookTitle) => {
    return await client.post('/api/notebooks/', {title: notebookTitle})
}

export const deleteNotebook = async (notebookId) => {
    // alert('hello')
    return await client.delete(`/api/notebooks/?book=${notebookId}`)
}

export const getNotebook = async ({queryKey}) => {
    const [_, id] = queryKey;
    // console.log(id)
    return await client.get(`/api/notebook/${id}/`)
}

export const submitNote = async (noteTitle, noteDescription, notebookId) => {

    return await client.post(`/api/note/`, {title:noteTitle, description:noteDescription, notebook:notebookId})
}

export const editNote = async (id, noteTitle, noteDescription, notebookId) => {


    return await client.put(`/api/note/`, {title:noteTitle, description:noteDescription, notebook:notebookId, id:id})

}

export const deleteNote = async (id, notebookId) => {

    console.log(id)

    return await client.delete(`/api/note/`, {data: {id:id, notebook: notebookId }})
}



export const login = async (username, password) => {
    return await client.post("/api/login", {
          username: username,
          password: password
        })
}

export const register = async (username, password) => {
    return await client.post("/api/register", {
        username: username,
        password: password
    })
}


export const logout = async () => {
    return await client.post('/api/logout')
}



// Old calls

export const fetchNotebooks = async () => {
    return await axios.get('http://127.0.0.1:8000/api/notebooks/')
    
}

export const fetchNotebook = async ({queryKey}) =>{
    // eslint-disable-next-line no-unused-vars
    const [_, id] = queryKey;
    console.log(id)
    return await axios.get(`http://127.0.0.1:8000/api/notebooks/${id}/`)
    // return await axios.get('http://127.0.0.1:8000/api/notebooks/1/')
}

export const submitNotebook = async (notebookTitle) =>{
    console.log(notebookTitle)
    return await axios.post('http://127.0.0.1:8000/api/notebooks/', {title: notebookTitle})
}

// export const deleteNotebook = async (notebookId) => {

//     return await axios.delete(`http://127.0.0.1:8000/api/notebooks/${notebookId}/`)
// }


// export const deleteNote = async (id) => {

//     console.log(id)

//     return await axios.delete(`http://127.0.0.1:8000/api/notes/${id}/`)
// }

// export const submitNote = async (noteTitle, noteDescription, notebookId) => {

//     return await axios.post(`http://127.0.0.1:8000/api/notes/`, {title:noteTitle, description:noteDescription, notebook:notebookId})
// }

// export const editNote = async (id, noteTitle, noteDescription, notebookId) => {


//     return await axios.put(`http://127.0.0.1:8000/api/notes/${id}/`, {title:noteTitle, description:noteDescription, notebook:notebookId})

// }


// export const getUser = async () => {
//     return await axios.get(`http://127.0.0.1:8000/api/user/`, {withCredentials:true})
// }

// export const Login = async (username, password) => {
//     return await axios.post(`http://127.0.0.1:8000/api/user/login/`, {username:username, password:password}, {withCredentials:true})
// }