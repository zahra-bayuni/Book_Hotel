import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import {toast} from "react-hot-toast";


const BookMarkContext = createContext();
const Base_Url = "http://localhost:5000";

function BookMarkListProvider({children}) {
    const [currentBookMark , setCurrentBookMark] = useState({});
    const [bookmarks , setBookmarks] = useState([]);
    const [isLoading , setIsLoading] = useState(false);

    
    useEffect(() => {
      async function fetchBookmarkList(){
        setIsLoading(true);
        try {
          const {data} =await axios.post(`${Base_Url}/bookmarks`);
          setBookmarks(data);
        } catch (error) {
          toast.error(error.message);
        }finally{
          setIsLoading(false);
        }
      }
      fetchBookmarkList(); 
    } , []);

    async function getBookMark(id){
      setIsLoading(true);
      setCurrentBookMark(null);
      try {
        const {data} =await axios.post(`${Base_Url}/bookmarks/${id}`);
        setCurrentBookMark(data);
      } catch (error) {
        toast.error(error.message);

      }finally{
        setIsLoading(false);
      }
    }

  async function createBookmark(newBookmark){
    setIsLoading(true);
    try {
      const {data} = await axios.post(`${Base_Url}/bookmarks/`, newBookmark );
      setCurrentBookMark(data);
      // console.log(data);
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error.message);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <BookMarkContext.Provider value={{
      isLoading,
       bookmarks, 
       currentBookMark , 
       getBookMark, 
       createBookmark,
       }}>
        {children}
    </BookMarkContext.Provider>
  )
}

export default BookMarkListProvider

export function useBookMark(){
    return useContext(BookMarkContext);
}