import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchsingleSite, updateSiteDetails } from "../../../../hooks/usefetch";
import { Api } from "../../../../utils/Api";

const EditFormData = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    address: "",
    mobile: "",
    email: "",
    title: "",
    social_media: {
      fb: "",
      wa: "",
      ins: "",
      yb: "",
      lnk: "",
      tw: "",
    },
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [faviconPreviewUrl, setFaviconPreviewUrl] = useState("");

  const { data: siteData = {}, isFetching } = useQuery({
    queryKey: ["site", id],
    queryFn: () => fetchsingleSite(id),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (siteData) {
      console.log(siteData);

      // Populate formData with fetched data
      setFormData((prevState) => ({
        ...prevState,
        address: siteData.address || "",
        url:siteData.url || "",
        favicon: siteData.favicon || "",
        mobile: siteData.mobile || "",
        email: siteData.email || "",
        title: siteData.title || "",
        social_media: siteData.social_media || {
          fb: "",
          wa: "",
          ins: "",
          yb: "",
          lnk: "",
          tw: "",
        },
      }));

      // Set preview URLs if available
    //   if (siteData.url) {
    //     setPreviewUrl(siteData.url);
    //   }
    //   if (siteData.favicon) {
    //     setFaviconPreviewUrl(siteData.favicon);
    //   }
    }
  }, [siteData]);
const navigate=useNavigate()
  console.log("Form Data:", formData);
  // Mutation for updating data
  const editMutation = useMutation({
    mutationFn: ({ id, data }) => updateSiteDetails(id, data),
    onSuccess: () => {
      navigate("/admin/site")
      setFormData({
        social_media: {
          fb: "",
          wa: "",
          ins: "",
          yb: "",
          lnk: "",
          tw: "",
        },
      });
      setPreviewUrl("");
      setFaviconPreviewUrl("");
      toast.success("Site details updated successfully");
    },
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      social_media: {
        ...prevData.social_media,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (type === "logo") {
        setPreviewUrl(previewUrl);
        setFormData((prev) => ({ ...prev, url: file }));
      } else if (type === "favicon") {
        setFaviconPreviewUrl(previewUrl);
        setFormData((prev) => ({ ...prev, favicon: file }));
      }
    }
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();

//     if (formData.url) {
//       formDataToSend.append("url", previewUrl);
//     }
//     if (formData.favicon) {
//       formDataToSend.append("favicon", faviconPreviewUrl);
//     }
//     if (formData.mobile) {
//       formDataToSend.append("mobile", formData.mobile);
//     }

//     if (formData.address) {
//       formDataToSend.append("address", formData.address);
//     }
//     if (formData.email) {
//       formDataToSend.append("email", formData.email);
//     }

//     // Append social media data to the FormData object

//     if (formData.social_media) {
//       Object.keys(formData.social_media).forEach((key) => {
//         formDataToSend.append(
//           `social_media[${key}]`,
//           formData.social_media[key]
//         );
//       });
//     }
//     for (let [key, value] of formDataToSend.entries()) {
//       console.log(`${key}:`, value);
//     }
//     console.log({ id, formDataToSend });
// // return
//     editMutation.mutate({ id, data: formDataToSend });
//   };
const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
  
    // Append files directly to FormData
    if (formData.title) {
      formDataToSend.append("title", formData.title);
    }
    if (previewUrl) {
      formDataToSend.append("url", formData.url);
    }
    if (faviconPreviewUrl) {
      formDataToSend.append("favicon", formData.favicon);
    }
    if (formData.mobile) {
      formDataToSend.append("mobile", formData.mobile);
    }
    if (formData.address) {
      formDataToSend.append("address", formData.address);
    }
    if (formData.email) {
      formDataToSend.append("email", formData.email);
    }
  
    // Append social media data
    if (formData.social_media) {
      Object.keys(formData.social_media).forEach((key) => {
        formDataToSend.append(
          `social_media[${key}]`,
          formData.social_media[key]
        );
      });
    }
  
    // for (let [key, value] of formDataToSend.entries()) {
    //   console.log(`${key}:`, value);
    // }
  
    editMutation.mutate({ id, data: formDataToSend });
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Edit Site Data</h2>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Logo</label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleFileChange(e, "logo")}
            />
            {previewUrl ? (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Preview:</p>
                <img
                  src={previewUrl}
                  crossOrigin="anonymous"
                  alt="Favicon Preview"
                  className="h-40 w-40 object-cover mt-2 border rounded-md"
                />
              </div>
            ) : (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Preview:</p>
                <img
                  src={`${Api.defaults.baseURL}/uploads/${formData.url}`}
                    // crossOrigin="anonymous"
                  alt="Logo Preview"
                  className="h-40 w-40 object-cover mt-2 border rounded-md"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Favicon</label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleFileChange(e, "favicon")}
            />
            {faviconPreviewUrl ? (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Preview:</p>
                <img
                  src={faviconPreviewUrl}
                  crossOrigin="anonymous"
                  alt="Favicon Preview"
                  className="h-40 w-40 object-cover mt-2 border rounded-md"
                />
              </div>
            ) : (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Preview:</p>
                <img
                  src={`${Api.defaults.baseURL}/uploads/${formData.favicon}`}
                  // crossOrigin="anonymous"
                  alt="Logo Preview"
                  className="h-40 w-40 object-cover mt-2 border rounded-md"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm 
            font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile || ""}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
            {["fb", "wa", "ins", "yb", "lnk", "tw"].map((platform) => (
              <div key={platform} className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  {platform.toUpperCase()}
                </label>
                <input
                  type="text"
                  name={platform}
                  value={formData.social_media[platform] || ""}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleSocialMediaChange}
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={editMutation.isLoading}
            className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ${
              editMutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {editMutation.isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditFormData;
