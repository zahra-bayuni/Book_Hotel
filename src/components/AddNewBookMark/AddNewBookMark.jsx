import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUrlLocation from '../../hooks/useUrlLocation';
import axios from 'axios';
import Loader from '../Loader/Loader';
import ReactCountryFlag from 'react-country-flag';
import { useBookMark } from '../context/BookMarkListProvider';

// function getFlagEmoji(countryCode) {
//     const codePoints = countryCode
//       .toUpperCase()
//       .split('')
//       .map(char =>  127397 + char.charCodeAt());
//     return String.fromCodePoint(...codePoints);
//   }

const Base_GeoCoding_Url =
 "https://api-bdc.net/data/reverse-geocode-client";

function AddNewBookMark() {
   const [lat , lng] =  useUrlLocation();
   const navigate = useNavigate();
   const [cityName, setCityName] = useState("");
   const [country, setCountry] = useState("");  
   const [countryCode, setCountryCode] = useState("");
   const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
   const [geoCodingError, setGeoCodingError] = useState(null);
   const {createBookmark} = useBookMark();
   useEffect(() => {
    if(!lat || !lng)return

     async function fetchLocationData(){
        setIsLoadingGeoCoding(true);
        setGeoCodingError(null);
        try {
           const {data} = await axios.get(
            `${Base_GeoCoding_Url}?latitude=${lat}&longitude=${lng}`
            );
          if(!data.countryCode) throw new Error("This location is not a city! please click somewhere else.")
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setCountryCode(data.countryCode);
        } catch (error) {
            setGeoCodingError(error.message);
        }finally{
            setIsLoadingGeoCoding(false);
        }
     }
     fetchLocationData();
   }, [lat,lng]);

   const handleSubmit = async (e) => {
    e.preventDefault();
    if(!cityName || !country) return;

    const newBookMark ={
        cityName,
        country,
        countryCode,
        latitude:lat,
        longitude:lng,
        host_location: cityName + " " + country,
    };

    await createBookmark(newBookMark);
    navigate("/bookmark");
   };

   if(isLoadingGeoCoding)return <Loader/>
   if(geoCodingError)return <p>{geoCodingError}</p>

  return (
    <div>
        <h2>Bookmark New Location</h2>
        <form className='form' onSubmit={handleSubmit}>
            <div className='formControl'>
                <label htmlFor="cityName">CityName</label>
                <input 
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                type="text" 
                name='cityName' 
                id='cityName' />
            </div>
            <div className='formControl'>
                <label htmlFor="country">Country</label>
                <input 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text" 
                name='country' 
                id='country' />
                <ReactCountryFlag className='flag' svg countryCode={countryCode} />
                {/* <span className='flag'>{countryCode}</span> */}
            </div>
            <div className='buttons'>
                <button className='btn btn--back' onClick={(e) => 
                {
                    e.preventDefault();
                    navigate(-1);
                }}>
                &larr; Back</button>
                <button className='btn btn--primary'>Add</button>
            </div>
        </form>
    </div>
  )
}
export default AddNewBookMark