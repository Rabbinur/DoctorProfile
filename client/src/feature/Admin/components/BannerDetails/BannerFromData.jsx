import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { CreateBlog } from "../../../../hooks/usefetch";

const BannerFromData = ({ setSelectedItem }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "banner",
    desc: "",
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: (formData) => CreateBlog(formData),
    onSuccess: (data) => {
      setFormData({ title: "", email: "", rating: "", desc: "" });
      setFile(null);
      setPreviewUrl("");
      if (data.message) {
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong"); // Display error toast
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
    setSelectedItem("details");
    addMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h3 className="text-lg font-semibold">Create Banner</h3>

      <label className="block mt-4">
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full mt-2"
          required
        />
      </label>

      <label className="block mt-4">
        Image:
        <input
          type="file"
          name="img"
          onChange={handleFileChange}
          className="border p-2 w-full mt-2"
          required
        />
        {previewUrl && (
          <div style={{ margin: "10px 0" }}>
            <p>Image Preview:</p>
            <img
              src={previewUrl}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "100px" }}
            />
          </div>
        )}
      </label>

      <label className="block mt-4">
        Description:
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          className="border p-2 w-full mt-2"
          required
        />
      </label>

      <button
        type="submit"
        disabled={addMutation.isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        {addMutation.isLoading ? "Creating..." : "Create Banner"}
      </button>
    </form>
  );
};

export default BannerFromData;
