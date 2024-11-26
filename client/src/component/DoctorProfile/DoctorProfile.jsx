import React from "react";
import Title from "../ui/Title/Title";
import Container from "../ui/Container/Container";
import profile from "../../assets/doctorimage.webp";
const DoctorProfile = () => {
  return (
    <div className="py-20">
      <Container>
        <Title> Who Am I ? </Title>

        <div className="grid pt-20 grid-cols-1 lg:grid-cols-2  gap-10">
          <div className="flex justify-center">
            <img src={profile} alt="name" loading="lazy" />
          </div>
          <div className="py-10 lg:py-0">
            <h2
              className="lg:text-2xl pb-1 text-lg font-bold uppercase tracking-widest text-black 
    text-start "
            >
              Dr. Jane Morrison
            </h2>
            <h3 className="py-2 text-primary">Surgeon,Associate Consultant</h3>
            <p className="py-2">
              HealSoul Health Services provide patients with choices to ask for
              the conducting and analyzing of several lab tests on-site at no
              cost for prioritized patients or at 70% for people with an
              insurance.
            </p>

            <div>
              <h3
                className="lg:text-2xl py-5 text-lg font-bold uppercase tracking-widest text-black 
    text-start "
              >
                Profession
              </h3>
              <ul className="space-y-3 list-disc px-5">
                <li>MBBS -2006-2011 From Dhaka Medical College</li>
                <li>MS Surgeon -2011-2015 DMC </li>
              </ul>
            </div>
            <div>
              <h3
                className="lg:text-2xl py-5 text-lg font-bold uppercase tracking-widest text-black 
    text-start "
              >
                Achievements
              </h3>
              <ul className="space-y-3 list-disc px-5">
                <li className="">Completed advanced fellowship training</li>
                <li>Recipient of "Best Surgeon Award" in 2022. </li>
                <li>Pioneered life-saving techniques in cardiac surgery. </li>
                <li>Mentored 50+ young surgeons globally. </li>
                <li>Specialized in advanced robotic and minimally invasive surgery. </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DoctorProfile;
