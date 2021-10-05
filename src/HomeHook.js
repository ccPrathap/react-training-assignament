import { useState, useEffect, useContext } from 'react';
import { DateTime } from 'luxon';
import DisplaySlots from './DisplaySlots';
import GlobalContext from './GlobalContext';

const COWIN_API_URL = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin";

function HomeHook(props) {
  const { age } = props;
  const { vaccineType } = useContext(GlobalContext);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [pincode, setPincode] = useState("");
  // const [vaccineType, setVaccineType] = useState("COVISHIELD");

  console.log("1. RENDER");

  useEffect(() => {
    console.log("2. Mount - componentDidMount");

    return () => {
      console.log("UnMount - componentWillUnmount");
    };
  }, []);

  useEffect(() => {
    console.log("3. UPDATE - componentDidUpdate");
  });

  useEffect(() => {
    console.log("4. Conditional UPDATE - componentDidUpdate");
  }, [props.age, date]);

  const handlePincode = e => {
    const value = e.target.value;
    if (value.length > 6) {
      return;
    }
    setPincode(value);
  };

  const login = () => {
    fetch(`${COWIN_API_URL}?pincode=${pincode}&date=${DateTime.fromSQL(date).toFormat("dd-MM-yyyy")}`)
      .then(res => res.json())
      .then(data => {
        const allSlots = data.sessions || [];
        // Write logic to filter out the data as per user requirement
        const filteredSlot = allSlots.filter(
          item => item.vaccine === vaccineType &&
            item.available_capacity_dose1 > 0
        );
        setSlots(filteredSlot);
      });
  };

  return <>
    <div>
      <h2>Find Vaccine slots for {age}</h2>
      <div className="pin">
        <div>
          <input
            type="number"
            value={pincode}
            placeholder="Enter Pincode"
            onChange={handlePincode}
          />
        </div>
        <div>
          <input
            type="date"
            min={DateTime.now().toISODate()}
            onChange={e => setDate(e.target.value)}
          />
        </div>
      </div>
      {/* <select value={vaccineType} onChange={e => setVaccineType(e.target.value)}>
        <option value="COVISHIELD">COVISHIELD</option>
        <option value="COVAXIN">COVAXIN</option>
        <option value="SPUTNIK V">SPUTNIK V</option>
      </select> */}
      <div style={{ marginBottom: "20px" }} />
      <input
        type="button"
        value="Find slots >"
        onClick={login}
        disabled={!(pincode && date)}
      />
    </div>
    <DisplaySlots slots={slots} />
  </>;
}

export default HomeHook;