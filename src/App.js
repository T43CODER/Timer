import "./App.css";
import { useState } from "react";

function dateDifference(startDate, endDate) {
  // Get the total difference in milliseconds
  let diffInMs = endDate - startDate;

  // Calculate months
  let months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  // Subtract the full months in milliseconds
  let tempDate = new Date(startDate);
  tempDate.setMonth(tempDate.getMonth() + months);
  if (tempDate > endDate) {
    months--;
    tempDate.setMonth(tempDate.getMonth() - 1);
  }

  // Calculate the difference after months
  diffInMs = endDate - tempDate;

  // Convert milliseconds to days, hours, minutes, and seconds
  const seconds = Math.floor((diffInMs / 1000) % 60);
  const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
  const hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMsPercent = diffInMs / (86400 * 1000);

  return { months, days, hours, minutes, seconds, diffInMsPercent };
}

function App() {
  const [timeLeft, setTimeLeft] = useState({});

  const updateTimeLeft = () => {
    const timeNow = new Date();
    const year = new Date().getFullYear();
    const firstDayOfNextYear = new Date(year, 11, 31, 24);
    const dateDifferenceResult = dateDifference(timeNow, firstDayOfNextYear);
    setTimeLeft(dateDifferenceResult);
  };

  setTimeout(updateTimeLeft, 1000);

  return (
    <div
      className="App"
      style={{
        width: `${100 - timeLeft.diffInMsPercent}%`,
      }}
    >
      <p>
        <strong>
          {timeLeft.months} Months, {timeLeft.days} Days, {timeLeft.hours}{" "}
          Hours, {timeLeft.minutes} Minutes, {timeLeft.seconds} Seconds
        </strong>
      </p>
    </div>
  );
}

export default App;
