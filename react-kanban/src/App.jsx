import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import Create from "./Pages/Create";

export default function App() {
  const {user} = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />

        <Route path="/create" element={<Create/>}/>
        <Route path="/register" element={user ? <Home/> : <Register/>} />
        <Route path="/login" element={<Login/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
