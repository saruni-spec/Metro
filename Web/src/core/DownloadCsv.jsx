// utils.js
import Papa from "papaparse";

export const downloadCsv = (data, filename, headers) => {
  const formattedData = data.map((item) =>
    headers.map((header) => item[header.replace(/ /g, "_").toLowerCase()])
  );

  const csv = Papa.unparse({
    fields: headers,
    data: formattedData,
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(URL.createObjectURL(blob));
  }
};
