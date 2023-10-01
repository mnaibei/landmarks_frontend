import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { fetchLandmarks } from '../../redux/landmarks/apiSlice';
import IntroHeader from './IntroHeader';
import SearchComponent from '../searchbar/Search';

const Landmarks = () => {
  const dispatch = useDispatch();
  const { landmarks } = useSelector((state) => state.landmarks);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [search, setSearch] = useState('');
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchLandmarks());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % landmarks.length);
    }, 35000);

    return () => clearInterval(interval);
  }, [landmarks]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredLandmarks = landmarks.filter((landmark) => {
    const landmarkName = landmark.name.toLowerCase();
    const searchTerm = search.toLowerCase();
    return landmarkName.includes(searchTerm);
  });

  const pageCount = Math.ceil(filteredLandmarks.length / itemsPerPage);

  const paginatedLandmarks = filteredLandmarks.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <>
      <IntroHeader />
      <SearchComponent value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="p-2 m-2 flex flex-col place-items-center items-center">
        <div className="grid grid-cols-2 max-sm:grid-cols-1 items-center justify-items-center w-full gap-2">
          {paginatedLandmarks.map((landmark, index) => (
            <div
              key={landmark.id}
              className={`landmarks-card border-2 rounded shadow flex flex-col h-9/12 w-full justify-center items-center p-2 ${index === currentImageIndex ? 'active' : ''
              }`}
            >
              {landmark.images.length > 0 && (
                <img
                  src={landmark.images[currentImageIndex % landmark.images.length]}
                  alt={`${landmark.name} ${currentImageIndex}`}
                  className="landmark-images border-2 rounded border-black"
                />
              )}
              <div className="flex flex-col gap-1 w-full p-2">
                <h1 className="text-2xl font-extrabold">{landmark.name}</h1>
                <p>
                  Type:
                  {' '}
                  {landmark.type_of_landmark}
                </p>
                <p className="desc">
                  Description:
                  {landmark.description || 'No info'}
                </p>
                <Link
                  to={`landmark/${landmark.name.replace(/\s+/g, '-').toLowerCase()}`}
                  state={landmark}
                  key={landmark.id}
                  className="learn-more flex bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded max-sm:w-full xl:w-2/5 max-lg:w-full justify-center items-center self-end marker:p-1"
                >
                  <button type="button">Learn More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination flex items-center mt-4 gap-4">
          <button
            onClick={() => handlePageChange((currentPage - 1 + pageCount) % pageCount)}
            disabled={currentPage === 0}
            type="button"
          >
            <AiOutlineArrowLeft />
          </button>
          <span>
            Page
            {' '}
            {currentPage + 1}
            {' '}
            of
            {' '}
            {pageCount}
          </span>
          <button
            onClick={() => handlePageChange((currentPage + 1) % pageCount)}
            disabled={currentPage === pageCount - 1}
            type="button"
          >
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Landmarks;
