
import Appoinment from '../../component/Appoinment/Appoinment';
import Banner from '../../component/Banner/Banner';
import Blogs from '../../component/Blogs/Blogs';
import ContactUs from '../../component/ContactUs/ContactUs';
import DoctorProfile from '../../component/DoctorProfile/DoctorProfile';
import Services from '../../component/services/Services';
import Testomonial from '../../component/Testomonial/Testomonial';

const Home = () => {
    return (
        <div>
           <Banner/>
           <DoctorProfile/>
        
           <Testomonial/>
           <Appoinment/> 
           <Blogs />
           <ContactUs/>
        </div>
    );
};

export default Home;