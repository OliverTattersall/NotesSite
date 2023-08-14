import {useNavigate} from "react-router-dom"

export const Notebook = ({title, id}) => {
    const navigate = useNavigate()

    const handleClick = ()=>{
        console.log('hello')
        navigate('/' + id.toString())

    }

    return (
        <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 shadow-lg shadow-grey-600 hover:shadow-black mt-4"
        onClick={handleClick}
        >
            <h1 className="font-bold">{title}</h1>
            {/* <p className="text-2xl font-bold">Test</p> */}
        </div>
    );
}