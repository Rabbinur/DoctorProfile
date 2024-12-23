import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  deleteChamberById, getChamberData } from "../../../../hooks/usefetch";
import Icon from "../../../../component/ui/Icon/Icon";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";


const ChamberDetails = () => {
  // Fetch chamber data
  const { data, isFetching } = useQuery({
    queryKey: ["chamber"],
    queryFn: getChamberData,
  });
  const queryClient = useQueryClient();
  const allData = data || [];
  // console.log(allData);
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteChamberById(id),
    onSuccess: (id) => {
      queryClient.invalidateQueries(["chamber"]);
      toast.success("Chamber deleted successfully");
    },
  });
  return (
    <div>
      <div className="">
        <div
          className="p- [20px]  text-white"
          style={{
            // backgroundImage: `url(${img1})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h3
            data-aos="fade-in"
            data-aos-delay="200"
            className="pb-5 underline
               font-bold text-center text-2xl text-black"
          >
            Timing
          </h3>

          <div
            className="grid grid-cols-1
           lg:grid-cols-2 gap-6"
          >
            {allData.map((chamber, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 150}
                className="relative bg-gradient-to-r
                 from-blue-50 to-white rounded-lg 
                 shadow-md overflow-hidden transition-transform 
                 transform hover:scale-105"
              >
                {/* Chamber Header */}
                <div className="p-4 bg-blue-500 text-white text-center">
                  <h2 className="font-bold text-lg uppercase tracking-wider">
                    {chamber.chamber}
                  </h2>
                </div>

                {/* Chamber Schedule */}
                <div className="p-5">
                  {chamber.schedule.map((scheduleItem, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                        <p className="font-semibold text-gray-700 underline">
                          {scheduleItem.day}
                        </p>
                      </div>
                      <ul className="list-inside list-disc ml-4 text-gray-600">
                        {scheduleItem.time.map((timeSlot, idx) => (
                          <li key={idx} className="text-sm">
                            {timeSlot}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className=" py-4 text-center text-black ">
                  <h1 className="font-bold text-[18px]">Chamber Address</h1>
                  <p className="">{chamber?.address}</p>
                </div>
                <div className="text-black flex justify-around mx-auto w-52 py-5">
                  <Link to={`/admin/chamber/${chamber?._id}`}>
                    <CiEdit size={30} className="text-primary" /> Edit{" "}
                  </Link>
                  <button
                    className="border border-gray-200 p-1 bg-white -400"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteMutation.mutate(chamber?._id);
                    }}
                    disabled={deleteMutation.isLoading}
                  >
                    <MdDeleteForever size={30} className="text-red-500" />
                  </button>
                </div>
                {/* Decorative Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-100 opacity-20 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChamberDetails;
