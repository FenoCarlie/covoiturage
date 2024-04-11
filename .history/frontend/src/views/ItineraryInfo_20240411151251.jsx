import DatePicker from "react-datepicker";
import { useStateContext } from "../context/ContextProvider";
import "react-datepicker/dist/react-datepicker.css";

function ItineraryInfo() {
  const { itineraryId } = useStateContext();

  const Example = () => {
    return <DatePicker selected={new Date()} inline />;
  };

  return (
    <>
      <div inline-datepicker data-date="02/25/2022"></div>
    </>
  );
}

export default ItineraryInfo;
