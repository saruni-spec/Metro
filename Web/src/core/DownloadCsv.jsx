// @ts-ignore
import { csv } from "csv-export";

export const downloadCsv = (data, filename) => {
  const headers = Object.keys(data[0]);
  const rows = data.map((item) => Object.values(item));

  const csvData = csv(rows, { headers });

  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
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
