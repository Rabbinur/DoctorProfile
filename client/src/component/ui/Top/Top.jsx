import  { useState, useEffect } from "react";
import Icon from "../Icon/Icon";


const Top = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolling down
  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const handleTopBottom = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className="fixed bottom-[10%] right-[1%] border size-10 rounded-full flex justify-center items-center transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-80 cursor-pointer animation"
          onClick={handleTopBottom}
          style={{ animation: "fadeIn 0.5s ease-in-out" }}
        >
          <Icon type="uparrow" className="text-primary" />
        </div>
      )}
    </>
  );
};

export default Top;