// import React, { useState } from "react";
// import { CiEdit } from "react-icons/ci";
// import { Api } from "../../../../utils/Api";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   fetchAboutData,
//   getAppointmentData,
//   updateAbout,
// } from "../../../../hooks/usefetch";
// import { toast } from "react-toastify";
// import AboutFromData from "./AboutFromData";
// import { useNavigate } from "react-router-dom";

// const AboutDetails = () => {
//   const queryClient = useQueryClient();
//  const navigate=useNavigate()
//   const [details, setCurrentDetails] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   console.log(details);
//   // Fetch appointment data

//   const { data: allData = {}, isFetching } = useQuery({
//     queryKey: ["about"],
//     queryFn: () => {
//       return fetchAboutData();
//     },
//     keepPreviousData: true,
//   });
//   const profile = allData?.payload?.getProfileData || [];
//   console.log(profile);
//   //delete appointment
//   // const deleteMutation = useMutation({
//   //   mutationFn: (id) => deleteAppointmentData(id),
//   //   onSuccess: (data, id) => {
//   //     const updatedAppointments = appointments.filter((item) => item._id !== id);

//   //     queryClient.setQueryData(
//   //       ["appointment", mobile, page, limit], // Ensure queryKey matches your query
//   //       (oldData) => ({
//   //         ...oldData,
//   //         data: updatedAppointments, // Update with the filtered data
//   //       })
//   //     );
//   //     // queryClient.invalidateQueries(["appointment", mobile]);
//   //     toast.success("Appointment deleted successfully");
//   //   },
//   // });

//   // Update mutation
//   const updateMutation = useMutation({
//     mutationFn: ({ id, data }) => updateAbout(id, data),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries(["about"]);
//       setShowModal(false);
//       if (data.message) {
//         toast.success(data.message);
//       }
//     },
//   });

//   const handleEdit = (details) => {
//     setCurrentDetails(details);
//     navigate(`/admin/about/${details._id}`, details)
//     // setShowModal(true);
//   };

//   const handleModalSubmit = (dataToSubmit) => {
//     console.log(dataToSubmit);
//     updateMutation.mutate({
//       id: details._id,
//       data: dataToSubmit,
//     });
//     setShowModal(false);
//   };

//   console.log(profile);

//   return (
//     <div>
//       <div>
//         {isFetching ? (
//           <p>Loading...</p>
//         ) : (
//           <>
//             <div className="">
//               {profile?.map((item) => (
//                 <div key={item._id} className="border">
//                   <div className="flex  justify-between">
//                     <div className="h-40">
//                       <img
//                         src={`${Api.defaults.baseURL}/uploads/${item?.url}`}
//                         crossOrigin="anonymous"
//                         alt={item?.name}
//                         loading="lazy"
//                         className=" h-40 object-cover transition-all 
//                       duration-300
//                         rounded group-hover:scale-110"
//                       />
//                     </div>
//                     <div className="p-2">
//                     <button
//                       className="border flex items-center
//                        font-bold gap-2 border-gray-200 p-1"
//                       onClick={() => handleEdit(item)}
//                     >
//                  Edit Profile     <CiEdit size={40} className="text-primary" />
//                     </button>
//                     </div>
//                   </div>
//                   <div className="py-5 p-3">
//                     <h1 className="font-bold"> {item.name}</h1>
//                     <h2 className="py-1 text-primary">{item.designation}</h2>

//                     <div
//                       className="md:mb-4 text-black"
//                       dangerouslySetInnerHTML={{
//                         __html: item?.desc,
//                       }}
//                     ></div>
//                     <div></div>
//                     <div>
//                       <h1 className="pb-5 font-bold text-2xl underline ">
//                         My services
//                       </h1>
//                       <div
//                         className="pb-10 pt-5 max-w-4xl mx-auto grid
//                  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-5 lg:gap-10"
//                       >
//                         {item.services.map((service, i) => (
//                           <div
//                             key={i}
//                             className="border border-primary
//            rounded-full
//           text-center py-2 hover:bg-primary
//            hover:text-white shadow-primary/50
//             shadow-2xl transition-all duration-500"
//                           >
//                             <h1>{service}</h1>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="py-2 pt-5 flex gap-5">
//                       <button
//                         className="border border-gray-200 p-1"
//                         onClick={() => handleEdit(item)}
//                       >
//                         <CiEdit size={30} className="text-primary" />
//                       </button>
//                       {/* <button
//                       className="border border-gray-200 p-1 bg-white -400"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         deleteMutation.mutate(item?._id);
//                       }}
//                       disabled={deleteMutation.isLoading}
//                     >
//                       <MdDeleteForever size={30} className="text-red-500" />
//                     </button> */}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 flex  items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//           <div className="bg-white relative p-6 rounded-lg shadow-lg max-w-md mx-auto">
//             <AboutFromData
//               data={details}
//               onSubmit={handleModalSubmit}
//               onClose={() => setShowModal(false)}
//             />
//             <button
//               className="absolute bottom-11 right-[15%] border px-2 py-1"
//               onClick={() => setShowModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AboutDetails;

import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutData } from "../../../../hooks/usefetch";
import { Api } from "../../../../utils/Api";
import { toast } from "react-toastify";

const AboutDetails = () => {
  const navigate = useNavigate();
  const [details, setCurrentDetails] = useState(null);

  const { data: allData = {}, isFetching } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    keepPreviousData: true,
  });

  const profile = allData?.payload?.getProfileData || [];

  return (
    <div>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            {profile.map((item) => (
              <div key={item._id} className="border">
                <div className="flex justify-between">
                  <div className="h-40">
                    <img
                      src={`${Api.defaults.baseURL}/uploads/${item?.url}`}
                      crossOrigin="anonymous"
                      alt={item?.name}
                      loading="lazy"
                      className="h-40 object-cover transition-all duration-300 rounded group-hover:scale-110"
                    />
                  </div>
                  <div className="p-2">
                    <Link
                      className="border flex items-center font-bold gap-2 border-gray-200 p-1"
                      to={`/admin/about/${item?._id}`}
                    >
                      Edit Profile <CiEdit size={40} className="text-primary" />
                    </Link>
                  </div>
                </div>
                <div className="py-5 p-3">
                  <h1 className="font-bold">{item.name}</h1>
                  <h2 className="py-1 text-primary">{item.designation}</h2>
                  <div
                    className="md:mb-4 text-black"
                    dangerouslySetInnerHTML={{ __html: item?.desc }}
                  ></div>
                  <h1 className="pb-5 font-bold text-2xl underline">My services</h1>
                  <div className="pb-10 pt-5 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
                    {item.services.map((service, i) => (
                      <div
                        key={i}
                        className="border border-primary rounded-full text-center py-2 hover:bg-primary hover:text-white shadow-primary/50 shadow-2xl transition-all duration-500"
                      >
                        <h1>{service}</h1>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AboutDetails;
