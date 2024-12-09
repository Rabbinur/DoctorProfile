import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllBlogs, updateSiteDetails } from "../../../../hooks/usefetch";
import { Api } from "../../../../utils/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const SiteDetails = () => {
  const type = "site";
  const [page] = useState(1);
  const [limit] = useState(10);

  // Fetch site details
  const { data: allData = {}, isFetching } = useQuery({
    queryKey: ["site", type, limit, page],
    queryFn: () => getAllBlogs({ type, page, limit }),
    keepPreviousData: true,
  });

  const site = allData?.blogs || [];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Site Details</h1>
      {isFetching && <p>Loading...</p>}
      {site.map((item) => (
        <div key={item._id} className="bg-white shadow p-4 rounded-lg mb-4">
          <div className="py-5">
            <h1 className="py-2 font-bold">Logo</h1>
            <img
              src={`${Api.defaults.baseURL}/uploads/${item?.url}`}
              alt="Logo"
              className="h-52 w-52 object-cover"
              // crossOrigin="anonymous"
              loading="lazy"
            />
          </div>
          <div className="py-5">
            <h1 className="py-2 font-bold">Favicon</h1>
            <img
              src={`${Api.defaults.baseURL}/uploads/${item?.favicon}`}
              alt="Favicon"
              className="h-52 w-52 object-cover"
              // crossOrigin="anonymous"
              loading="lazy"
            />
          </div>
          <div>
            <span className="font-bold">Details</span>
            <h1 className="py-2 font-bold">Title: {item?.title}</h1>
            <h1 className="py-2 font-bold">Email: {item?.email}</h1>
            <h1 className="py-2 font-bold">Mobile: {item?.mobile}</h1>
            <h1 className="py-2 font-bold">Address: {item?.address}</h1>
          </div>
          <div>
            <h2 className="text-lg my-2 font-bold">Social Media Links</h2>
            <ul className="space-y-2">
              {Object.entries(item.social_media).map(([key, value]) => (
                <li key={key}>
                  {value ? (
                    <a
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      {key.toUpperCase()}: {value}
                    </a>
                  ) : (
                    <span className="text-gray-500">
                      {key.toUpperCase()} - N/A
                    </span>
                  )}
                </li>
              ))}
            </ul>
            
          </div>
         <div className="mt-5">
         <Link
              to={`/admin/site/${item._id}`}
              className=" px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Update
            </Link>
         </div>
        </div>
      ))}
    </div>
  );
};

export default SiteDetails;
