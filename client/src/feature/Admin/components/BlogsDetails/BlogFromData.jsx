// import React, { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { CreateBlog } from "../../../../hooks/usefetch";
// import { toast } from "react-toastify";

// const BlogFormData = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     desc: "",
//     type: "blog",
//   });

//   const [file, setFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");

//   const addMutation = useMutation({
//     mutationFn: (formData) => CreateBlog(formData),
//     onSuccess: (data) => {
//       setFormData({ title: "", category: "", desc: "" });
//       setFile(null);
//       setPreviewUrl("");
//       if (data.message) {
//         toast.success(data.message);
//       }
//     },
//     onError: (error) => {
//       toast.error(error.message || "Something went wrong"); // Display error toast
//     },
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);

//       // Generate a preview URL for the image
//       const preview = URL.createObjectURL(selectedFile);
//       setPreviewUrl(preview);
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData();

//     Object.entries(formData).forEach(([key, value]) => {
//       data.append(key, value);
//     });

//     if (file) {
//       data.append("url", file);
//     }
//     console.log({ data });

//     addMutation.mutate(data);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded">
//       <h3 className="text-lg font-semibold">Create Blog</h3>

//       <label className="block mt-4">
//         Title:
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           className="border focus:outline-none p-2 w-full mt-2"
//           required
//         />
//       </label>

//       <label className="block mt-4">
//         Category:
//         <input
//           type="text"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="border focus:outline-none p-2 w-full mt-2"
//           required
//         />
//       </label>
//       <label className="block mt-4">
//         Description:
//         <textarea
//           type="text"
//           name="desc"
//           rows={5}
//           value={formData.category}
//           onChange={handleChange}
//           className="border focus:outline-none p-2 w-full mt-2"
//           required
//         />
//       </label>

//       <label className="block mt-4">
//         Image:
//         <input
//           type="file"
//           name="url"
//           onChange={handleFileChange}
//           accept="/images*"
//           className="border p-2 w-full mt-2"
//           required
//         />
//         <div>
//           {previewUrl && (
//             <div style={{ margin: "10px 0" }}>
//               <p>Image Preview:</p>
//               <img
//                 src={previewUrl}
//                 alt="Preview"
//                 style={{ maxWidth: "100%", maxHeight: "50px" }}
//               />
//             </div>
//           )}
//         </div>{" "}
//       </label>

//       <button
//         type="submit"
//         disabled={addMutation.isLoading}
//         className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//       >
//         {addMutation.isLoading ? "Creating..." : "Create Blog"}
//       </button>
//     </form>
//   );
// };

// export default BlogFormData;

import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateBlog, updateBlog } from "../../../../hooks/usefetch";
import { toast } from "react-toastify";

const BlogFormData = ({ blogToEdit, onClose,setSelectedItem }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    desc: "",
    type: "blog",
  });

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (blogToEdit) {
      setFormData({
        title: blogToEdit.title,
        category: blogToEdit.category,
        desc: blogToEdit.desc,
        type: "blog",
      });
      setPreviewUrl(blogToEdit.imageUrl || "");
    }
  }, [blogToEdit]);

  const addMutation = useMutation({
    mutationFn: (data) => CreateBlog(data),
    onSuccess: () => {
        setFormData({ title: "", category: "", desc: "" });
      setFile(null);
      setPreviewUrl("");
      queryClient.invalidateQueries(["blog", "blog"]);
      onClose();
      toast.success("Blog created successfully");
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, data }) => updateBlog(id, data),
    onSuccess: () => {
        setFormData({ title: "", category: "", desc: "" });
      setFile(null);
      setPreviewUrl("");
      queryClient.invalidateQueries(["blog", "blog"]);
      onClose();
      toast.success("Blog updated successfully");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (file) {
      data.append("url", file);
    }

    if (blogToEdit) {
      editMutation.mutate({ id: blogToEdit._id, data });
      setSelectedItem("details")
    } else {
      addMutation.mutate(data);
      setSelectedItem("details")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h3 className="text-lg font-semibold">
        {blogToEdit ? `Edit Blog ${blogToEdit._id} ` : "Create Blog"}
      </h3>

      <label className="block mt-4">
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border focus:outline-none p-2 w-full mt-2"
          required
        />
      </label>

      <label className="block mt-4">
        Category:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border focus:outline-none p-2 w-full mt-2"
          required
        />
      </label>

      <label className="block mt-4">
        Description:
        <textarea
          name="desc"
          rows={5}
          value={formData.desc}
          onChange={handleChange}
          className="border focus:outline-none p-2 w-full mt-2"
          required
        />
      </label>

      <label className="block mt-4">
        Image:
        <input
          type="file"
          onChange={handleFileChange}
          accept="/images*"
          className="border p-2 w-full mt-2"
        />
        {previewUrl && (
          <div style={{ margin: "10px 0" }}>
            <p>Image Preview:</p>
            <img
              src={previewUrl}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "50px" }}
            />
          </div>
        )}
      </label>

      <button
        type="submit"
        disabled={addMutation.isLoading || editMutation.isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        {addMutation.isLoading || editMutation.isLoading
          ? "Saving..."
          : blogToEdit
          ? "Update Blog"
          : "Create Blog"}
      </button>
    </form>
  );
};

export default BlogFormData;
