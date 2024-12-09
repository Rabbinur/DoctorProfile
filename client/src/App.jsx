import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useMemo, useState } from 'react';
import { getAllBlogs } from './hooks/usefetch';
import { useQuery } from '@tanstack/react-query';

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out' });
  }, []);

  const type = 'site';
  const [page] = useState(1);
  const [limit] = useState(10);

  // Fetch site details
  const { data: allData = {}, isFetching } = useQuery({
    queryKey: ['site', type, limit, page],
    queryFn: () => getAllBlogs({ type, page, limit }),
    keepPreviousData: true,
  });

  const site = useMemo(() => allData?.blogs?.[0] || {}, [allData]);

  useEffect(() => {
 
    if (site.title) {
      document.title = site.title; 
    }

    if (site.favicon) {
      // Update or create the favicon link
      let favicon = document.querySelector("link[rel='icon']");
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }
      favicon.href = `/path-to-favicons/${site.favicon}`;
    }
  }, [site]); // Re-run when `site` changes

  return (
    <>
      <div className='overflow-hidden'>
        {isFetching && <p></p>}
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
