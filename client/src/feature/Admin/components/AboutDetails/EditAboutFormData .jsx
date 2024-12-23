import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutData, fetchAboutDataId, updateAbout } from "../../../../hooks/usefetch";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AboutFormData from "./AboutFromData";

const EditAboutFormData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateAbout(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["about"]);
      toast.success(data.message || "Updated successfully");
      navigate("/admin/about");
    },
  });

  const handleSubmit = (dataToSubmit) => {
    updateMutation.mutate({ id, data: dataToSubmit });
  };

  return (
    <div>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        details && (
          <AboutFormData
            data={details}
            onSubmit={handleSubmit}
            onClose={() => navigate("/admin/about")}
          />
        )
      )}
    </div>
  );
};

export default EditAboutFormData;
