import React from "react";
import Title from "../ui/Title/Title";
import Container from "../ui/Container/Container";
import profile from "../../assets/doctorimage.webp";
const DoctorProfile = () => {
  return (
    <div className="py-20">
      <Container>
        <Title> Who Am I ? </Title>

        <div className="grid py-20 grid-cols-1 md:grid-cols-2  gap-10">
          <div className="flex justify-center">
            <img src={profile} alt="name" loading="lazy" />
          </div>
          <div>
            <h2
              className="lg:text-2xl text-lg font-bold uppercase tracking-widest text-black 
    text-center "
            >
              Dr. Jane Morrison
            </h2>
            <p className="py-2">
              HealSoul Health Services provide patients with choices to ask for
              the conducting and analyzing of several lab tests on-site at no
              cost for prioritized patients or at 70% for people with an
              insurance.
            </p>
         <div>
         <h3 className="lg:text-2xl py-5 text-lg font-bold uppercase tracking-widest text-black 
    text-start ">Profession</h3>
                
         </div>
         <div>
         <h3 className="lg:text-2xl py-5 text-lg font-bold uppercase tracking-widest text-black 
    text-start ">Achivement</h3>
         </div>
          </div>
          
        </div>
      </Container>
    </div>
  );
};

export default DoctorProfile;
