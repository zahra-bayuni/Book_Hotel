
import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";
import { Route, Routes, useNavigate } from "react-router-dom";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import { useMapEvent } from "react-leaflet";
import BookMarkLayout from "./components/bookmarkLayout/BookMarkLayout";
import BookMarkListProvider from "./components/context/BookMarkListProvider";
import BookMark from "./components/BookMark/BookMark";
import SingleBookMark from "./components/SingleBookMark.jsx/SingleBookMark";
import AddNewBookMark from "./components/AddNewBookMark/AddNewBookMark";

function App() {
  return <BookMarkListProvider>
    <HotelsProvider>
    <Toaster /> 
    <Header />
    <Routes>
      <Route path="/" element={<LocationList />} />
      <Route path="/hotels" element={<AppLayout /> }>
        <Route index element={<Hotels />} />
        <Route path=":id" element={<SingleHotel />} />
      </Route>
      <Route path="/bookmark" element={<BookMarkLayout />}>
        <Route index element={<BookMark />} />
        <Route path=":id" element={<SingleBookMark/>} />
        <Route path="add" element={<AddNewBookMark />} />
      </Route>
    </Routes>
    {/* <LocationList /> */}
  </HotelsProvider>
  </BookMarkListProvider>
}

export default App;

