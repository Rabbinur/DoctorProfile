import React from 'react';
import ContactDetails from '../../components/ContactDetails/ContactDetails';

const Contact = () => {
    return (
        <div>
          <div className="p-4">
        <div>
          <div className="flex flex-wrap items-center py-5 justify-between">
            <h1 className="text-xl font-bold mb-4">Contact Details</h1>
          
          </div>
          <div className="bg-white shadow-card p-3">
            {/* Display content based on active button */}

           <ContactDetails/>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Contact;