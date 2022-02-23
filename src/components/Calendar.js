import React, { useMemo, useState } from "react";

// pass Number of month (0-11) and get back String/name of Month
// getMonthName(0) = Januar
function getMonthName(month) {
  const date = new Date(); // Tue Feb 22 2022 19:07:24 GMT+0100 (Central European Standard Time)
  date.setMonth(month);
  // undefined vzame od browserja jezik
  return Intl.DateTimeFormat(undefined, {
    month: "long",
  }).format(date);
}

// pass Number of day (0-6, Sunday - Saturday) and get back String/name of Day
// getDayName(0) = Monday (MO - because slice)
function getDayName(day) {
  const date = new Date();
  date.setDate(day - date.getDay() + date.getDate());
  // undefined vzame od browserja jezik
  return Intl.DateTimeFormat(undefined, { weekday: "short" })
    .format(date)
    .slice(0, 2);
}

export default function Calendar() {
  // months are 0-11
  let monthInNumber = new Date().getMonth(); // 1 (februar)
  let yearInNumber = new Date().getFullYear(); // 2022
  const [month, setMonth] = useState(monthInNumber);
  const [year, setYear] = useState(yearInNumber);

  // ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  // ustvari 7 praznih elementov in poloopaj gatDayName
  const days = new Array(7).fill(null).map((_, day) => getDayName(day));

  // logika za premikanje mesecev
  const monthUp = () => {
    if (month === 11) {
      setMonth(0);
      setYear((year) => year + 1);
    } else {
      setMonth((month) => month + 1);
    }
  };

  const monthDown = () => {
    if (month === 0) {
      setMonth(11);
      setYear((year) => year - 1);
    } else {
      setMonth((month) => month - 1);
    }
  };

  const monthTable = useMemo(() => {
    const firstDay = new Date(); // Wed Feb 23 2022 17:47:58 GMT+0100 (Central European Standard Time)
    firstDay.setDate(1); // Tue Feb 01 2022 17:49:18 GMT+0100 (Central European Standard Time)
    firstDay.setMonth(month); // Tue Feb 01 2022 17:49:58 GMT+0100 (Central European Standard Time)

    const firstDayNumber = firstDay.getDay(); // 2 (ker je torek (line 61) - (0-6, ned-sob))

    const lastDay = new Date(year, month + 1, 0); // Mon Feb 28 2022 00:00:00 GMT+0100 (Central European Standard Time)

    const lastDayNumber = lastDay.getDay(); // 1 (ker je ponedeljek)

    const howManyDaysInMonth = lastDay.getDate(); // 28

    // prvi dan = 2 + stevilo dni v mescu = 28 == 30. 30 / 7 = 4,3...
    // Math.ceil - zaokrozi na gor = 5
    const nrOfColumns = Math.ceil((firstDayNumber + howManyDaysInMonth) / 7); // 5

    // naredi 5 vrstic (nrOfColumns = 5)
    let monthsGrid = new Array(nrOfColumns).fill(null).map((_, row) => {
      // vsaka vrstica ima 7 dni
      const daysOfColumn = new Array(7).fill(null).map((_, column) => {
        // prva vrstica
        if (row === 0) {
          //firstDayNumber = 2, zato je 0col prazen, 1col prazen, in 2col izpolni pogoj zato 1
          if (column >= firstDayNumber) {
            return column - firstDayNumber + 1;
          }
          return null;
        }
        // zadnja vrstica
        // ker se row zacne steti z 0
        if (row === nrOfColumns - 1) {
          // lastDayNumber = 1, zato
          // column = 0 ergo 28 - 1 + 0 = 27
          // column = 1 ergo 28 - 1 + 1 = 28, pogoj izpolnjen ostala polja so null
          if (column <= lastDayNumber) {
            return howManyDaysInMonth - lastDayNumber + column;
          }
          return null;
        }
        // ostale vrstice
        // ker imam za row=0 ze pravilo zacnem z row = 1
        // (1 * 7) + 1 - (2) + 0 ergo prvi datum v 1row je = 6
        return row * 7 + 1 - firstDayNumber + column;
      });
      // console.log(daysOfColumn) (spodaj)
      // [null, null, 1, 2, 3, 4, 5]
      // [6, 7, 8, 9, 10, 11, 12]
      // ...
      // [27, 28, null, null, null, null, null]
      return daysOfColumn;
    });
    return monthsGrid;
  }, [month, year]);

  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="max-w-sm w-full shadow-lg">
        <div className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
          {/* mesec, leto, gumbUpMonth, gumbDownMont */}
          <div className="px-4 flex items-center justify-between">
            <span
              tabIndex="0"
              className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800"
            >
              {getMonthName(month)} {year}
            </span>
            <div className="flex items-center">
              <button
                onClick={monthDown}
                aria-label="calendar backward"
                className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
              >
                <i className="bi bi-chevron-left" />
              </button>
              <button
                onClick={monthUp}
                aria-label="calendar forward"
                className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
              >
                <i className="bi bi-chevron-right" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-12 overflow-x-auto">
            <table className="w-full">
              {/* imena dni */}
              <thead>
                <tr>
                  {days.map((day, i) => {
                    return (
                      <th key={i}>
                        <div className="w-full flex justify-center">
                          <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                            {day}
                          </p>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* tabela z stevilkami dni v mescu */}
              <tbody>
                {monthTable.map((row, rowNr) => {
                  return (
                    <tr key={rowNr}>
                      {row.map((value, columnNr) => {
                        return (
                          <td
                            className="pt-6"
                            key={`${value}${rowNr}${columnNr}`}
                          >
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              {value}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
