import DatePicker from "react-datepicker";
import { useStateContext } from "../context/ContextProvider";

function ItineraryInfo() {
  const { itineraryId } = useStateContext();

  const Example = () => {
    return <DatePicker selected={new Date()} inline />;
  };

  return (
    <>
      <Example />
    </>
  );
}

export default ItineraryInfo;
