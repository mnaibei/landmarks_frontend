import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLandmarks } from "../../redux/landmarks/apiSlice";

const Landmarks = () => {
  const dispatch = useDispatch();
  const landmarks = useSelector((state) => state.landmarks.landmarks);



  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchLandmarks());
  }, [dispatch]);

  useEffect(() => {
    // Automatically advance the image index
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextImageIndex = (prevIndex + 1) % landmarks.length;

        console.log("landmarks.length", landmarks.length);
        console.log("currentImageIndex", prevIndex);
        console.log("nextImageIndex", nextImageIndex);

        return nextImageIndex;
      });
    }, 300000); // Change image every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [landmarks]);

  return (
    <div>
      <h2>Landmarks</h2>
      <div className="container">
        {landmarks.map((landmark, index) => (
          <div
            key={landmark.id}
            className={`landmarks-card ${index === currentImageIndex ? "active" : ""
              }`}
          >
            {landmark.name}
            {landmark.images.length > 0 && (
              <img
                src={landmark.images[currentImageIndex % landmark.images.length]} // Use modulo to ensure index is within bounds
                alt={`${landmark.name} - Image ${currentImageIndex}`}
                className="landmark-images"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landmarks;
