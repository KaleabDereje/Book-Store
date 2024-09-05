import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import BackButton from "../components/BackButton.jsx";
import { useSnackbar} from 'notistack';

const DeleteBook = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const enqueueSnackbar = useSnackbar();
    const { id } = useParams();


    const handleDeleteBook = () => {
        setLoading(true);

        axios.delete(`http://localhost:8080/books/${id}`)
            .then(() =>{
                setLoading(false);
                enqueueSnackbar('Deleted Successfully', {variant: 'success'});
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('error', {variant: 'error'});
                console.log(error);
                navigate('/');
            });
 };

    return(
        <div className="p-4">
            <BackButton/>
            <h1 className="text-3x1 my-4">Delete Book</h1>
            {loading ? <Spinner/> : ''}
            <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-fit p-8 mx-auto">
                <h3 className="text-2x1">Are You Sure You Want To Delete This Book?</h3>

                <button className="p-4 rounded-xl bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}> Yes, Delete It</button>
            </div>
        </div>
    );
}

export default DeleteBook;