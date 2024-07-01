import React, { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [html, setHtml] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const formSubmit = async (data) => {
    const newData = { ...data, description: html };
    try {
      const res = await fetch("http://localhost:8000/api/blogs", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const result = await res.json();
      console.log(result); // handle success
      toast("Blog added successfully");
      navigate("/");
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-between pt-5 mb-4">
        <h4>Create Blog</h4>
        <a href="/" className="btn btn-dark">
          Back
        </a>
      </div>
      <div className="card border-0 shadow-lg">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                {...register("title", { required: true })}
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                placeholder="Title"
              />
              {errors.title && (
                <p className="invalid-feedback">Title field is required</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Short Description
              </label>
              <textarea
                {...register("shortDesc")}
                className="form-control"
                cols="30"
                rows="5"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Description
              </label>
              <Editor
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                containerProps={{ style: { height: "400px" } }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Image</label>
              <input type="file" className="form-control" placeholder="Image" />
            </div>

            <div className="mb-3">
              <label className="form-label">Author</label>
              <input
                {...register("author", { required: true })}
                type="text"
                className={`form-control ${errors.author ? "is-invalid" : ""}`}
                placeholder="Author"
              />
              {errors.author && (
                <p className="invalid-feedback">Author field is required</p>
              )}
            </div>
            <button className="btn btn-dark">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
