import { useState } from "react";
import { iconsData } from "../../../../constants/constants";
import AboutDetails from "../../components/AboutDetails/AboutDetails";

const About = () => {
  const [selectedItem, setSelectedItem] = useState("details");

  return (
    <div className="h-full">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex  flex-wrap gap-5 items-center justify-between py-5">
          <h1 className="text-xl underline font-bold">Doctor Profile</h1>
          <div className="flex hidden gap-4">
            {iconsData?.map(({ key, label, icon }, i) => (
              <button
                key={i}
                aria-pressed={selectedItem === key}
                onClick={() => setSelectedItem(key)}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md ${
                  selectedItem === key ? "bg-primary text-white" : "bg-white text-primary"
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:p-4 bg-white rounded-md shadow">
          {selectedItem === "details" && <AboutDetails />}
          {/* Add other sections if needed */}
        </div>
      </div>
    </div>
  );
};

export default About;
