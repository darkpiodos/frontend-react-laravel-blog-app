import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="bg-dark text-center py-2 shadow-lg">
        <h1 className="text-white">React & Laravel Blog App</h1>
      </div>

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/create" element={<CreateBlog />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
