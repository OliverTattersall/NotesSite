import { Notebook } from "../components/Notebook"

const notebooks=[{'title':'test1', 'id':1}, {'title':'test2', 'id':2}]


export const Notebooks = ()=>{
    // notebooks.map((notebook)=>{console.log(notebook); return notebook})
    // console.log(notebooks)
    return (
        <div className="mx-auto">
            <h1 className="text-center text-2xl mt-10 underline">Notebooks</h1>
            {notebooks.map((notebook) => 
                    <Notebook title={notebook.title} id={notebook.id} key={notebook.id}/>
                )}
        </div>
    )
}