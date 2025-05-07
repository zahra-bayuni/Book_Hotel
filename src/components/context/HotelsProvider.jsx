import React, { createContext, useContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import axios from 'axios';


const HotelContext = createContext();
const Base_Url = "http://localhost:5000/hotels";

function HotelsProvider({children}) {
    const [currentHotel , setCurrentHotel] = useState({});
    const [isLoadingCurrHotel, setIsLoadingCurrHotel] =useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get("destination");
    const rooms = JSON.parse(searchParams.get("options"))?.room;
    const {isLoading , data:hotels } = useFetch(Base_Url,
    `q=${destination || ""}&accommodates_gte=${rooms || 1}`);

  async function getSingleHotel(id){
    setIsLoadingCurrHotel(true);
    try {
      const {data} =await axios.get(`${Base_Url}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrHotel();  
    }
  }

  return (
    <HotelContext.Provider value={{isLoading, hotels, currentHotel , getSingleHotel, isLoadingCurrHotel}}>
        {children}
    </HotelContext.Provider>
  )
}

export default HotelsProvider

export function useHotels(){
    return useContext(HotelContext);
}