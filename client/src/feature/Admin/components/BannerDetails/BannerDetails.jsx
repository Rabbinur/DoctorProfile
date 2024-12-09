import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { deleteBlog, getAllBlogs } from '../../../../hooks/usefetch';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { Api } from '../../../../utils/Api';

const BannerDetails = () => {
    const queryClient = useQueryClient();
  const type = "banner";
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data: allData = {}, isFetching } = useQuery({
    queryKey: ["banners", type, limit, page],
    queryFn: () => getAllBlogs({ type, page, limit }),
    keepPreviousData: true,
  });
  const banner = allData?.blogs || [];
  console.log(banner);
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBlog(id),
    onSuccess: (id) => {
      const updatedBlogs = banner.filter((item) => item._id !== id);

      //   queryClient.setQueryData(
      //     ["blog", type, page, limit],
      //     (oldData) => ({
      //       ...oldData,
      //       data: updatedBlogs, // Update with the filtered data
      //     })
      //   );
      queryClient.invalidateQueries(["banners", type, page, limit]);
      toast.success("Blog deleted successfully");
    },
  });
    return (
        <div>
     <div>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {banner?.map((item) => (
              <div key={item._id} className="border">
                <div className="h-40">
                  <img
                    src={`${Api.defaults.baseURL}/uploads/${item?.url}`}
                    // crossOrigin="anonymous"
                    alt={item?.name}
                    loading="lazy"
                    className=" h-40 object-cover transition-all 
                      duration-300
                        rounded group-hover:scale-110"
                  />
                </div>
                <div className="py-5 p-3">
                  <h1 className="font-bold"> {item.title}</h1>
                  <h2 className="py-1">{item.category}</h2>
                  <p className=""> {item.desc}</p>

                  <div className="py-2 pt-5 flex gap-5">
                    {/* <button
                      className="border border-gray-200 p-1"
                      onClick={() => handleEdit(item)}
                    >
                      <CiEdit size={30} className="text-primary" />
                    </button> */}
                    <button
                      className="border border-gray-200 p-1 bg-white -400"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteMutation.mutate(item?._id);
                      }}
                      disabled={deleteMutation.isLoading}
                    >
                      <MdDeleteForever size={30} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
         
        </>
      )}

    
    </div>       
        </div>
    );
};

export default BannerDetails;