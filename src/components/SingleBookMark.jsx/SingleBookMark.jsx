import React, { useEffect } from 'react'
import { useBookMark } from '../context/BookMarkListProvider'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

function SingleBookMark() {
  const { id } = useParams();
  const { getBookMark , isLoading, currentBookMark } = useBookMark();
  const navigate = useNavigate();
  useEffect(() =>{
    getBookMark(id); 
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };
  
  if(isLoading || !currentBookMark) return <Loader />
  return (
    <div>
        <button onClick={handleBack} className='btn btn--back'>&larr; Back</button>
        <h2>{currentBookMark.cityName} - {currentBookMark.country}</h2>
    </div>
  )
}

export default SingleBookMark