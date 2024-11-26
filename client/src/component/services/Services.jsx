import React from "react";
import Container from "../ui/Container/Container";
import Title from "../ui/Title/Title";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="py-10 bg-[#f1f6f9]">
      <Container>
        <div className="pb-10">
          <Title>Services Offered</Title>
          <p className="pt-12 max-w-3xl text-center mx-auto">Our clients are our priority, we offer quality dental services with a team of specialists. More details about our services below.</p>
        </div>
        <div
          className="pb-10 pt-5 max-w-4xl mx-auto grid
                 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-10"
        >
          <div className="border border-primary rounded-full
           text-center py-2 hover:bg-primary hover:text-white shadow-primary/50 shadow-2xl transition-all duration-500">
            <h1>General Surgery</h1>
          </div>
          <div className="border border-primary rounded-full
           text-center py-2 hover:bg-primary hover:text-white shadow-primary/50 shadow-2xl transition-all duration-500">
            <h1>Cardiothoracic Surgery</h1>
          </div>
          <div className="border border-primary rounded-full
           text-center py-2 hover:bg-primary
            hover:text-white shadow-primary/50 shadow-2xl transition-all duration-500">
            <h1>Neurosurgery</h1>
          </div>
        
          <div className="border border-primary rounded-full
           text-center py-2 hover:bg-primary
            hover:text-white
             shadow-primary/50 shadow-2xl transition-all duration-500">
            <h1>Orthopedic Surgery</h1>
          </div>
        </div>
        <div className="max-w-2xl mx-auto py-10">
             {/* Appointment Button */}
             <div className="flex justify-center">
              <Link className="border font-medium uppercase
               border-primary group relative px-4 py-2 
                text-primary transition-colors duration-[400ms] hover:bg-primary hover:text-white">
              Make  Appointment +
              </Link>
            </div>
        </div>
      </Container>
    </div>
  );
};

export default Services;
