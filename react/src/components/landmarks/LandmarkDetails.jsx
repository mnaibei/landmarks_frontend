import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useMediaQuery } from 'react-responsive';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const LandmarkDetails = () => {
  const { state } = useLocation();
  console.log('state', state);
  console.log('state.images', state.images.length);
  console.log('coordinates', state.coordinates);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [coordinates, setCoordinates] = useState({
    latitude: 0, // Default values or the actual coordinates
    longitude: 0,
  });

  // make map responsive
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const desktopZoom = 2.5;
  const mobileZoom = 1.1;
  const desktopHeight = '500px';
  const mobileHeight = '200px';

  const zoomLevel = isMobile ? mobileZoom : desktopZoom;
  const mapHeight = isMobile ? mobileHeight : desktopHeight;

  useEffect(() => {
    // Automatically advance the image index
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextImageIndex = (prevIndex + 1) % state.images.length;

        console.log('state.length', state.images.length);
        console.log('currentImageIndex', prevIndex);
        console.log('nextImageIndex', nextImageIndex);

        return nextImageIndex;
      });
    }, 35000); // Change image every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {
    // Update coordinates state with data values
    setCoordinates({
      latitude: state.coordinates.latitude,
      longitude: state.coordinates.longitude,
    });
  }, [state.coordinates]);

  return (
    <>
      <div className="mt-16 m-2 text-center gap-2 flex flex-col items-center">
        <h1 className="text-2xl font-extrabold">{state.name}</h1>
        {state.images.length > 0 && (
          <img
            src={state?.images[currentImageIndex % state.images.length]}
            alt={`${state.name} ${currentImageIndex}`}
            className="landmark-details-images"
          />
        )}
      </div>
      <div className="description m-2 border-2  grid grid-cols-2 p-2">
        <div className="details-description p-2">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold">Description:</h2>
            <p>
              {state.description || 'No info'}
            </p>
            <h2 className="font-bold">Historical Significance:</h2>
            <p>
              -
              {' '}
              {state.historical_significance || 'No info'}
              {' '}
              <br />
            </p>
            <h2 className="font-bold">Opening hours:</h2>
            <p>
              -
              {' '}
              {state.opening_hours}
            </p>
            <h2 className="font-bold">Weather:</h2>
            <p>
              -
              {' '}
              {state.weather}
            </p>
            <h2 className="font-bold">Wildlife:</h2>
            <p>
              -
              {' '}
              {state.wildlife || 'No wildlife'}
            </p>
            <h2 className="font-bold">Accessibility:</h2>
            <p>
              -
              {' '}
              {state.accessibility}
            </p>
            <h2 className="font-bold">Entry fees:</h2>
            <p>
              -
              {' '}
              {state.visiting_price}
            </p>
            <h2 className="font-bold">Entry requirements:</h2>
            <p>
              -
              {' '}
              {state.entry_requirements}
            </p>
            <h2 className="font-bold">Photography:</h2>
            <p>
              -
              {' '}
              {state.photography_rules}
            </p>
          </div>
          <div className=" flex flex-col gap-1 mt-1">
            <div className="historical-timeline">
              <h2 className="font-bold">Historical Timeline:</h2>
              <ul className="flex flex-col break-words">
                {state.history_timeline ? (
                  Object.entries(state.history_timeline).map(([event, date]) => (
                    <li key={event} className="list-disc ml-7 capitalize">
                      {event}
                      :
                      {' '}
                      {date || 'No info'}
                    </li>
                  ))
                ) : (
                  <li>No info</li>
                )}
              </ul>
            </div>

            <h2 className="font-bold">Local culture:</h2>
            <p>
              -
              {' '}
              {state.local_culture}
            </p>

            <div className="special-events">
              <h2 className="font-bold">Special events:</h2>
              <ul>
                {state.special_events !== 'None' ? (
                  state.special_events.map((event) => (
                    <li key={event} className="list-disc ml-7">{event}</li>
                  ))
                ) : (
                  <li>No info</li>
                )}
              </ul>
            </div>

            <div className="tips-for-visitors">
              <h2 className="font-bold">Tips for visitors:</h2>
              <ul className="break-words">
                {state.tips_for_visitors ? (
                  state.tips_for_visitors.map((tip) => (
                    <li key={tip} className="list-disc ml-7">{tip}</li>
                  ))
                ) : (
                  <li>No info</li>
                )}
              </ul>
            </div>

            <div className="nearby-attractions">
              <h2 className="font-bold">Nearby attractions:</h2>
              <ul>
                {state.nearby_attractions ? (
                  state.nearby_attractions.map((attraction) => (
                    <li key={attraction} className="list-disc ml-7">{attraction}</li>
                  ))
                ) : (
                  <li>No info</li>
                )}
              </ul>
            </div>

            <div className="facilities">
              <h2 className="font-bold">Facilities:</h2>
              <ul className="break-words">
                {state.facilities ? (
                  Object.entries(state.facilities).map(([facility, available]) => (
                    <li key={facility} className="list-disc ml-7 capitalize">
                      {facility}
                      :
                      {available ? 'Available' : 'Not Available'}
                    </li>
                  ))
                ) : (
                  <li>No info</li>
                )}
              </ul>

              <h2 className="font-bold">Parking Information:</h2>
              <ul>
                {state.parking_information ? (
                  <li className="list-disc ml-7">
                    Fees:
                    {' '}
                    {state.parking_information.fees}
                  </li>
                ) : (
                  <li>No info</li>
                )}
              </ul>

              <h2 className="font-bold">Guided Tours:</h2>
              <ul>
                <li className="list-disc ml-7">
                  {state.guided_tours ? 'Available' : 'Not Available'}
                </li>
              </ul>

              <h2 className="font-bold">Souvenir Shops:</h2>
              <ul>
                <li className="list-disc ml-7">
                  {state.souvenir_shops ? 'Available' : 'Not Available'}
                </li>
              </ul>

            </div>

          </div>
        </div>
        <div className="location p-2">
          <p className="font-bold py-2 break-words">
            Location:
            {state.address}
          </p>

          <MapContainer
            center={[coordinates.latitude, coordinates.longitude]}
            zoom={zoomLevel} // You can adjust the zoom level as needed
            style={{ height: mapHeight, width: '100%' }} // Set the map size
            className="border-2 border-black z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Use OpenStreetMap tiles
            />
            <Marker position={[coordinates.latitude, coordinates.longitude]} />
          </MapContainer>
          <div className="contact-info mt-2 border-2 shadow p-2 flex flex-col gap-2">
            <p className="font-bold break-words">Contact information:</p>
            <ul>
              <li>
                Phone number:
                {' '}
                {state.contact_information.phone}
              </li>
              <li>
                Email:
                {' '}
                <a href={`mailto:${state.contact_information.email}`} className="underline text-blue-500 break-words">{state.contact_information.email}</a>
              </li>
              <li>
                Website:
                {' '}
                <a href={state.contact_information.website} className="underline text-blue-500 break-words">{state.contact_information.website}</a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </>
  );
};

export default LandmarkDetails;
