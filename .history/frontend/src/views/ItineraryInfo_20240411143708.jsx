
import DatePicker from "react-datepicker";

function ItineraryInfo() {
  const { itineraryId } = useStateContext();

  const Example = () => {
    return <DatePicker selected={new Date()} inline />;
  };

  return (
  <>
    </>
  </>
  );
}

export default ItineraryInfo;
