import { useState } from "react";
import Calendar from "./components/Calendar";
import dayjs from "dayjs";

const App: React.FC = () => {
  const [date, setDate] = useState(dayjs());

  return (
    <div style={{ padding: "40px 100px" }}>
      <Calendar
        value={date}
        onChange={(date) => {
          setDate(date);
        }}
        locale="en-US"
      />
    </div>
  );
};

export default App;
