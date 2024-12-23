import React, { useState, useEffect, useRef } from "react";
import { Api } from "../../../../utils/Api";
import JoditEditor from "jodit-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAboutDataId, updateAbout } from "../../../../hooks/usefetch";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const AboutFormData = () => {
  const { id } = useParams();
 
  const queryClient = useQueryClient();
  const [details, setDetails] = useState(null);
//  console.log(id);
  // Fetch the data for the specific ID
  const { data, isFetching } = useQuery({
    queryKey: ["about", id],
    queryFn: () => fetchAboutDataId(id),
    onSuccess: (data) => {
      setDetails(data);
    },
    keepPreviousData: true,
  });
// console.log(data)
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    desc: "",
    services: [],
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [description, setDescription] = useState("");
  const editor = useRef(null);
 const navigate=useNavigate()
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        designation: data.designation || "",
        desc: data.desc?.replace(/<\/?[^>]+(>|$)/g, '')|| "",
        services: data.services || [],
      });
      // setDescription({description:data.desc?.replace(/<\/?[^>]+(>|$)/g, '')|| "",})
      if (data.url) {
        setPreviewUrl(`${Api.defaults.baseURL}/uploads/${data.url}`);
      }
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, index) => {
    const { value } = e.target;
    const newServices = [...formData.services];
    newServices[index] = value; // Update with the full string entered in the input field
    setFormData((prev) => ({
      ...prev,
      services: newServices,
    }));
  };

  const handleAddService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, ""], // Add an empty string to create a new input field
    }));
  };

  const handleRemoveService = (index) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      services: newServices, // Update state with the new services array
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateAbout(id, data),
    onSuccess: (data) => {

      setFormData({
        name: "",
        designation: "",
        desc: "",
        services: [],
      })
      navigate("/admin/about")
      queryClient.invalidateQueries(["about"]);
      toast.success(data.message || "Updated successfully");
     
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form data before submitting:", formData); // Debugging line

    const data = new FormData();
    data.append("name", formData.name);
    data.append("desc", description);

    // data.append("desc", formData.desc);
    data.append("services", JSON.stringify(formData.services)); // Ensure it's a JSON string of an array

    if (file) {
      data.append("url", file);
    }
         
    // console.log("Form data submitted:", data); // Debugging line
    updateMutation.mutate({ id, data: data });
 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="designation" className="mb-2">
          Designation
        </label>
        <input
          type="text"
          id="designation"
          name="designation"
          value={formData.designation || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="desc" className="mb-2">
          Description
        </label>
        {/* <textarea
          id="desc"
          name="desc"
          rows={5}
          value={formData.desc || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        /> */}
        <JoditEditor
          ref={editor}
          value={description.description}
          // value={formData.desc}
          onChange={(newContent) => setDescription(newContent)}
          className="w-full bg-white px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="url" className="mb-2">
          Image URL
        </label>
        <input
          type="file"
          id="url"
          name="url"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            // crossOrigin="anonymous"
            className="mt-2 w-full h-52 object-cover"
          />
        )}
      </div>

      <div className="overflow-auto h-44">
        <label className="block mb-2">Services</label>
        {formData.services.map((service, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={service}
              onChange={(e) => handleArrayChange(e, index)}
              className="border p-2 rounded mr-2 flex-grow"
            />
            <button
              type="button"
              onClick={() => handleRemoveService(index)}
              className="bg-red-500 text-white px-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddService}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Service
        </button>
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default AboutFormData;
