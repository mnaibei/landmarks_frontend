import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLandmarks } from "../../redux/landmarks/apiSlice";

const Landmarks = () => {
  const dispatch = useDispatch();
  const landmarks = useSelector((state) => state.landmarks.landmarks);

  console.log(landmarks);

  useEffect(() => {
    dispatch(fetchLandmarks());
  }, [dispatch]);

  return (
    <div>
      <h2>Landmarks</h2>
      <ul>
        {landmarks.map((landmark) => (
          <li key={landmark.id}>
            {landmark.name}
            <ul>
              {landmark.images.map((image, index) => (
                <li key={index}>
                  <img src={image} alt={`${landmark.name} - Image ${index}`} className="landmark-images" />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Landmarks;
