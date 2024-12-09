import React from "react";
import Container from "../ui/Container/Container";
import Title from "../ui/Title/Title";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutData } from "../../hooks/usefetch";

const Services = () => {
  const { data: allData = {}, isFetching } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    keepPreviousData: true,
  });

  const profile = allData?.payload?.getProfileData || [];
  //  console.log(profile);
  return (
    <div id="services" className="py-20 bg-[#f1f6f9]">
      <Container>
        <div className="pb-10">
          <div data-aos="fade-in" data-aos-delay="200">
            <Title>Services Offered</Title>
          </div>
          <p
            data-aos="fade-in"
            data-aos-delay="300"
            className="pt-12 max-w-3xl text-center mx-auto"
          >
            Our clients are our priority, we offer quality dental services with
            a team of specialists. More details about our services below.
          </p>
        </div>
        <div
          className="pb-10 pt-5 max-w-4xl mx-auto grid
               grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-10"
        >
          {profile?.[0]?.services?.length ? (
            profile[0]?.services.map((it, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100} // Add delay for cascading effect
                className="border border-primary rounded-full
              text-center py-2 hover:bg-primary hover:text-white shadow-primary/50 shadow-2xl transition-all duration-500"
              >
                <h1>{it}</h1>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">
              No services available at the moment.
            </p>
          )}
        </div>
        <div
          data-aos="fade-in"
          data-aos-delay="600"
          className="max-w-2xl mx-auto py-10"
        >
          {/* Appointment Button */}
          <div className="flex justify-center">
            <Link
              to="/appointment"
              className="border font-medium uppercase
             border-primary group relative px-4 py-2 
              text-primary transition-colors duration-[400ms] hover:bg-primary hover:text-white"
            >
              Make Appointment +
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Services;
