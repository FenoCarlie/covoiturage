import DatePicker from "react-datepicker";
import { useStateContext } from "../context/ContextProvider";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../axios-client";

function ItineraryInfo() {
  const { itineraryId } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState({});

  const getItinerary = (itineraryId) => {
    setLoading(true);
    axiosClient
      .get("/show/itinerary", itineraryId)
      .then(({ data }) => {
        setLoading(false);
        setItinerary(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return <></>;
}

export default ItineraryInfo;
