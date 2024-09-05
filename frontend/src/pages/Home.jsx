import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksCard from "../components/home/BooksCard.jsx";
import BooksTable from "../components/home/BooksTable.jsx";



const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8080/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    /*useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/books')
          .then(response => response.json())
          .then(data => {
            setBooks(data.data);
          })
          .catch(error => {
            console.error('Error fetching books:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);
      */

    return (
        <div className="p-4">
            <div className="flex justify-center items-center gap-x-4">
                <button className="bg-sky-300 hover:bg-sky-600 py-1 px-4 rounded-lg"
                    onClick={() => setShowType('table')}
                >
                    Table
                </button>
                <button className="bg-sky-300 hover:bg-sky-600 py-1 px-4 rounded-lg"
                    onClick={() => setShowType('card')}
                >
                    Card
                </button>
            </div>
            <div className="flex justify-between items-center">
                <h1 className='text-3x1 my-8'>Books List</h1>
                <Link to="/books/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : showType === 'table' ? (<BooksTable books={books} />) : (<BooksCard books={books} />)


            }
        </div>
    );
}

export default Home;