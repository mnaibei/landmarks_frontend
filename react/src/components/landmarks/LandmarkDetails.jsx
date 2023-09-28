import { useLocation } from "react-router-dom";

const LandmarkDetails = () => {
    const { state } = useLocation();
    console.log("state", state);



    return (
        <div>
            <h1>{state.name}</h1>
        </div>
    );
};

export default LandmarkDetails;