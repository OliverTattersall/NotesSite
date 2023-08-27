import {useNavigate} from "react-router-dom"
import { deleteNotebook } from "../scripts/api"

export const Notebook = ({title, id, refetch}) => {
    const navigate = useNavigate()

    const handleClick = ()=>{
        console.log('hello')
        navigate('/notebook/' + id.toString())

    }

    const handleDelete = () => {
        const deletePromise = deleteNotebook(id);
        deletePromise.then(()=>{
            // refetch();
            navigate('/notebooks/');
        })
    }

    return (
        <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 shadow-lg shadow-grey-600 hover:shadow-black mt-4"
        onClick={handleClick}
        >
            <h1 className="font-bold inline-block w-5/6">{title}</h1>
            <div className="inline-block w-1/6">
                <button onClick={handleDelete} class="p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none" type="button">
                    <svg enable-background="new 0 0 20 20" class="w-6 h-6 inline-block mt-4">
                        <rect width="40" height="6" />
                    </svg>
                </button>
                {/* <p className="text-2xl font-bold">Test</p> */}
            </div>
        </div>
    );
}