import React from "react";

export default function CalendarCeil({ value, rowNr, columnNr, setDay, fromDay, toDay }) {
    
  return (
    <td className="pt-6" key={`${value}${rowNr}${columnNr}`} onClick={setDay}>
      <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
        {value}
      </div>
    </td>
  );
}
