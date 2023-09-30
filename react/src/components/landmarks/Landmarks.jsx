import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLandmarks } from '../../redux/landmarks/apiSlice';
import IntroHeader from './IntroHeader';

const Landmarks = () => {
  const dispatch = useDispatch();
  const { landmarks } = useSelector((state) => state.landmarks);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchLandmarks());
  }, [dispatch]);

  useEffect(() => {
    // Automatically advance the image index
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextImageIndex = (prevIndex + 1) % landmarks.length;

        console.log('landmarks.length', landmarks.length);
        console.log('currentImageIndex', prevIndex);
        console.log('nextImageIndex', nextImageIndex);

        return nextImageIndex;
      });
    }, 35000); // Change image every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [landmarks]);

  return (
    <>
      <IntroHeader />
      <div className="p-2 m-2  flex flex-col place-items-center items-center">
        <div className=" grid grid-cols-2 max-sm:auto-rows-fr items-center  justify-items-center w-full gap-2">
          {landmarks.map((landmark, index) => (

            <div
              // to={`landmark/${landmark.name.replace(/\s+/g, '-')
              // .toLowerCase()}`} // show landmark name in the url path instead of id
              // state={landmark}
              key={landmark.id}
              className={`landmarks-card border-2 rounded shadow flex flex-col h-9/12 w-full justify-center items-center p-2 ${index === currentImageIndex ? 'active' : ''
              }`}
            >
              {landmark.images.length > 0 && (
                <img
                  src={landmark.images[currentImageIndex
                    % landmark.images.length]} // Use modulo to ensure index is within bounds
                  alt={`${landmark.name} ${currentImageIndex}`}
                  className="landmark-images border-2 rounded border-black "
                />
              )}
              <div className=" flex flex-col gap-1
              "
              >

                <h1 className="text-2xl font-extrabold">{landmark.name}</h1>
                <p>
                  Type:
                  {' '}
                  {landmark.type_of_landmark}
                </p>

                <p className="desc">
                  Description:
                  {' '}
                  {landmark.description || 'No info'}
                  {' '}
                  <br />
                  {' '}
                </p>

                <Link
                  to={`landmark/${landmark.name.replace(/\s+/g, '-').toLowerCase()}`}
                  state={landmark}
                  key={landmark.id}
                  className="learn-more flex bg-transparent
                  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded max-sm:w-full md:w-2/5 justify-center items-center self-end marker:p-1"
                >
                  <button type="button">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

          ))}
        </div>
      </div>
    </>
  );
};

export default Landmarks;
