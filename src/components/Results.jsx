import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useStateContext } from '../contexts/StateContextProvider';
import { Loading } from './Loading';

export const Results = () => {
  const { results, loading, getResults, searchTerm } = useStateContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm !== '') {
     
      getResults(`${location.pathname}/q=${searchTerm}&num=20`);      }
    
  }, [searchTerm, location.pathname]);

  if (loading) return <Loading />;

  switch (location.pathname) {
    case '/search':
      return (
        <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
          {/* {results?.results?.map(({ Item, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">{link.length > 30 ? link.substring(0, 30) : link}</p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700  ">{title}</p>
              </a>
            </div>
          ))} */}
           {results?.data?.map((item, index) => (
        <div key={index} className="md:w-2/5 w-full">
          <a href={item.source_url} target="_blank" rel="noopener noreferrer ">
          <p className="text-sm">{item.source_url.length > 30 ? item.source_url.substring(0, 30) : item.source_url}</p>

          <p className="text-lg hover:underline dark:text-blue-300 text-blue-700  ">{item.title}</p>
 
          </a>
        </div>
      ))}
        </div>
      );
    case '/images':
      // return (
      //   <div className="flex flex-wrap justify-center items-center">
      //     {results?.image_results?.map(({ image, link: { href, title } }, index) => (
      //       <a href={href} target="_blank" key={index} rel="noreferrer" className="sm:p-3 p-5">
      //         <img src={image?.src} alt={title} loading="lazy" />
      //         <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
      //       </a>
      //     ))}
      //   </div>
      // );
      return(
        <div className="flex flex-wrap justify-center items-center">
          {results?.data?.map((item, index) => (
            <a href={item.source_url} target="_blank" key={index} rel="noreferrer" className="sm:p-3 p-5">
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={item.url} alt={item.title} loading="lazy" className="w-full" style={{ height: '200px' }} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{item.title}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
  );
    case '/news':
      return (
        <div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
          {results?.data?.map(({ id, source_url, source_domain, title }) => (
            <div key={id} className="md:w-2/5 w-full ">
              <a href={source_url?.[0].href} target="_blank" rel="noreferrer " className="hover:underline ">
                <p className="text-lg dark:text-blue-300 text-blue-700">{title}</p>
              </a>
              <div className="flex gap-4">
                <a href={source_domain?.href} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-300"> {source_domain?.href}</a>
              </div>
            </div>
          ))}
        </div>
      );
   
    default:
      return 'Error...';
  }
};