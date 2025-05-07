import React from 'react'
import Map from '../Map/Map';
import { Outlet } from 'react-router-dom';
import { useBookMark } from '../context/BookMarkListProvider';

function BookMarkLayout() {
    const {bookmarks} = useBookMark();
    return (
        <div className='appLayout'>
            <div className='sidebar'>
                <Outlet />
            </div>
            <Map markerLocations={bookmarks} />
        </div>
      );
}

export default BookMarkLayout