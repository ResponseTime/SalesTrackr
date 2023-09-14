import React from "react";

export default function Transaction() {
  const months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <div className="contain">
        <div className="utility">
          <input type="search" name="" id="" placeholder="search" />
          <select>
            {months.map((m) => {
              return (
                <option
                  value={m}
                  selected={m == "July" ? "selected" : ""}
                  name={m}
                >
                  {m}
                </option>
              );
            })}
          </select>
        </div>
        <table>
          <tr>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
          </tr>
          <tr>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
          </tr>
          <tr>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
            <td>some text</td>
          </tr>
        </table>
        <div className="tool">
          <button>Previous Page</button>
          <button>Next Page</button>
        </div>
      </div>
    </>
  );
}
