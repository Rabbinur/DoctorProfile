import React from "react";
import Title from "../ui/Title/Title";
import Container from "../ui/Container/Container";
import profile from "../../assets/doctorimage.webp";
import Services from "../services/Services";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutData } from "../../hooks/usefetch";
import { Api } from "../../utils/Api";
const DoctorProfile = () => {
  const { data: allData = {}, isFetching } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    keepPreviousData: true,
  });

  const profile = allData?.payload?.getProfileData || [];

  return (
    <>
      <div id="about" className="py-20">
        <Container>
          <div data-aos="fade-in">
            <Title> Who Am I ? </Title>
          </div>

          <div className="grid pt-20 grid-cols-1 lg:grid-cols-2  gap-10">
            {profile.map((item) => (
              <>
                <div
                  data-aos="fade-right"
                  data-aos-delay={200}
                  className="flex h-full w-full justify-center"
                >
                  <img
                    src={`${Api.defaults.baseURL}/uploads/${item?.url}`}
                    alt="name"
                    // crossOrigin="anonymous"
                    loading="lazy"
                    className="h- 52 object-cover w-full"
                  />
                </div>
                <div className="py-10 lg:py-0">
                  <h2
                    data-aos="fade-left"
                    data-aos-delay={300}
                    className="lg:text-2xl pb-1 text-lg font-bold uppercase tracking-widest text-black 
    text-start "
                  >
                    {item?.name}
                  </h2>
                  <h3
                    data-aos="fade-left"
                    data-aos-delay={400}
                    className="py-2 text-primary"
                  >
                    {item?.designation}
                  </h3>
                  <div
                    data-aos="fade-up"
                    data-aos-delay={500}
                    className="md:mb-4 text-black"
                    dangerouslySetInnerHTML={{ __html: item?.desc }}
                  ></div>
                </div>{" "}
              </>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default DoctorProfile;
