import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
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
    }, 300000); // Change image every 3 seconds (adjust as needed)

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
      <div>
        <h1>{state.name}</h1>
        {state.images.length > 0 && (
          <img
            src={state.images[currentImageIndex % state.images.length]}
            alt={`${state.name} ${currentImageIndex}`}
            className="landmark-details-images"
          />
        )}
      </div>
      <div className="description">
        <p>
          Description:
          {state.description || 'No info'}
          {' '}
          <br />
          {' '}
        </p>
        <p>
          Historical Significance:
          {state.historical_significance || 'No info'}
          {' '}
          <br />
        </p>
        <p>
          Opening hours:
          {state.opening_hours}
        </p>
        <p>
          Weather:
          {state.weather}
        </p>
        <p>
          Wildlife:
          {state.wildlife || 'No wildlife'}
        </p>
        <p>
          Accessibility:
          {state.accessibility}
        </p>
        <p>
          Entry fees:
          {state.visiting_price}
        </p>
        <p>
          Entry requirements:
          {state.entry_requirements}
        </p>
        <p>
          Photography:
          {state.photography_rules}
        </p>
        <div className="historical-timeline">
          <p>Historical Timeline:</p>
          <ul>
            {state.history_timeline ? (
              Object.entries(state.history_timeline).map(([event, date]) => (
                <li key={event}>
                  {event}
                  :
                  {date || 'No info'}
                </li>
              ))
            ) : (
              <li>No info</li>
            )}
          </ul>
        </div>

        <p>
          Local culture:
          {state.local_culture}
        </p>

        <div className="special-events">
          <p>Special events:</p>
          <ul>
            {state.special_events ? (
              state.special_events.map((event) => (
                <li key={event}>{event}</li>
              ))
            ) : (
              <li>No info</li>
            )}
          </ul>
        </div>

        <div className="tips-for-visitors">
          <p>Tips for visitors:</p>
          <ul>
            {state.tips_for_visitors ? (
              state.tips_for_visitors.map((tip) => (
                <li key={tip}>{tip}</li>
              ))
            ) : (
              <li>No info</li>
            )}
          </ul>
        </div>

        <div className="nearby-attractions">
          <p>Nearby attractions:</p>
          <ul>
            {state.nearby_attractions ? (
              state.nearby_attractions.map((attraction) => (
                <li key={attraction}>{attraction}</li>
              ))
            ) : (
              <li>No info</li>
            )}
          </ul>
        </div>

        <div className="facilities">
          <p>Facilities:</p>
          <ul>
            {state.facilities ? (
              Object.entries(state.facilities).map(([facility, available]) => (
                <li key={facility}>
                  {facility}
                  :
                  {available ? 'Available' : 'Not Available'}
                </li>
              ))
            ) : (
              <li>No info</li>
            )}
          </ul>

          <p>Parking Information:</p>
          <ul>
            {state.parking_information ? (
              <li>
                Fees:
                {' '}
                {state.parking_information.fees}
              </li>
            ) : (
              <li>No info</li>
            )}
          </ul>

          <p>Guided Tours:</p>
          <ul>
            <li>
              {state.guided_tours ? 'Available' : 'Not Available'}
            </li>
          </ul>

          <p>Souvenir Shops:</p>
          <ul>
            <li>
              {state.souvenir_shops ? 'Available' : 'Not Available'}
            </li>
          </ul>

        </div>

        <div className="contact-info">
          <p>Contact information:</p>
          <ul>
            <li>
              Phone number:
              {state.contact_information.phone}
            </li>
            <li>
              Email:
              <a href={`mailto:${state.contact_information.email}`} className="href">{state.contact_information.email}</a>
            </li>
            <li>
              Website:
              <a href={state.contact_information.website} className="href">{state.contact_information.website}</a>
            </li>
          </ul>
        </div>

        <div className="location">
          <p>
            Location:
            {state.address}
          </p>

          <MapContainer
            center={[coordinates.latitude, coordinates.longitude]}
            zoom={2.5} // You can adjust the zoom level as needed
            style={{ height: '400px', width: '100%' }} // Set the map size
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Use OpenStreetMap tiles
            />
            <Marker position={[coordinates.latitude, coordinates.longitude]} />
          </MapContainer>

        </div>
      </div>
    </>
  );
};

export default LandmarkDetails;
