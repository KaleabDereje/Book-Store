import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar} from 'notistack';

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const enqueueSnackbar = useSnackbar();
    const { id } = useParams();
    
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8080/books/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleEditBook = () => {
        const data = {
            title, 
            author, 
            publishYear,
        };

        setLoading(true);
        axios.put(`http://localhost:8080/books/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Updated Successfully', {variant: 'success'});
                navigate('/');
            })
            .catch((error) =>{
                setLoading(false);
                enqueueSnackbar('Error', {variant: 'error'});
                console.log(error);
            });
    }

    return(
        <div className="p-4">
            <BackButton/>
            <h1 className="text-3xl my-4">Edit Book</h1>
            {loading ? <Spinner/> : ''}

            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 mx-auto">
                <div className="my-4">
                    <label htmlFor="" className="text-xl mr-4 text-gray-500">Title</label>
                    <input type="text"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           className="border rounded-xl border-gray-500 px-4 py-2 w-full"
                     />
                </div>
                <div className="my-4">
                    <label htmlFor="" className="text-xl mr-4 text-gray-500">Title</label>
                    <input type="text"
                           value={author}
                           onChange={(e) => setAuthor(e.target.value)}
                           className="border rounded-xl border-gray-500 px-4 py-2 w-full"
                     />
                </div>
                <div className="my">
                    <label htmlFor="" className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input type="number"
                            value={publishYear}
                            onChange={(e) => setPublishYear(e.target.value)}
                            className="border rounded-xl border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <button className="p-2 rounded-xl bg-sky-300 m-8" onClick={handleEditBook}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default EditBook; 