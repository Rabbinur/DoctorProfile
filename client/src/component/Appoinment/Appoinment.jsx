import React from "react";
import Container from "../ui/Container/Container";
import Title from "../ui/Title/Title";
import img1 from "../../assets/pls-40.jpg";
const Appoinment = () => {
  return (
    <div>
      <Container>
        <Title>Booked Your Appointment</Title>
        <div className="py-10 hidden grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            className="p-[50px] text-center text-white"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <h3 className="py-5 text-xl text-white">Timing</h3>
            <ul>
              <li>MON ... 11.00 - 03.00 pm</li>
              <li>FRY ... 11.00 - 03.00 pm</li>
              <li>SAT ... 11.00 - 03.00 pm</li>
              <li>SUN ... 11.00 - 03.00 pm</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Appoinment;
