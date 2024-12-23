import React, { useState } from 'react';
import ChamberDetails from '../../components/chamberDetails/ChamberDetails';
import { iconsData } from '../../../../constants/constants';
import ChamberFromData from '../../components/chamberDetails/ChamberFromData';

const Chamber = () => {
    const [selectedItem, setSelectedItem] = useState("details");
    return (
        <div>
             <div className="p-4">
        <div>
          <div className="flex flex-wrap items-center py-5 justify-between">
            <h1 className="text-xl font-bold mb-4">Chamber Details</h1>
            <div className="flex gap-5 mr-5">
              {iconsData.map(({ key, label, icon }, i) => (
                <button
                  key={i}
                  aria-pressed={selectedItem === key}
                  onClick={() => setSelectedItem(key)}
                  className={`flex items-center gap-2
                   text-[#545F7D] border border-primary rounded-md py-2
                    text-[15px] capitalize px-[12px] ${
                      selectedItem === key
                        ? `bg-primary
                   text-white`
                        : "bg-white"
                    }`}
                >
                  <span
                    className={`text-primary flex gap-2  ${
                      selectedItem === key ? `text-white` : ""
                    }`}
                  >
                    {icon} {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white shadow-card p-3">
            {/* Display content based on active button */}

            {selectedItem === "details" && <ChamberDetails />}
            {selectedItem === "addNew" && (
              <ChamberFromData selectedId={null} setSelectedItem={setSelectedItem} />
            )}
          </div>
        </div>
      </div>
        </div>
    );
};

export default Chamber;