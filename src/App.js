import React from 'react';
import './App.css';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
const data = [
  { source1: "Text", target1: "Text" },
  { source2: "Text", target2: "Text-D" },
  { source3: "true", target3: "true" },
  { source4: "true", target4: "false" },
  { source5: 100, target5: 100 },
  { source6: 100, target6: 100.5 },
];
const table = {
  columns: [],
  values: []
};
data.forEach((d) => {
  Object.keys(d).forEach((e) => {
    table.columns.push(e);
    table.values.push(d[e]);
  })
});

const App = () => {
  const highlightStyle = { backgroundColor: 'yellow' };
  const tbl = React.useRef();
  
 /* Callback invoked when the button is clicked */
//  const downloadExcel = React.useCallback(() => {
//   /* Create worksheet from HTML DOM TABLE */
//   const wb = XLSX.utils.table_to_book(tbl.current);
//   /* Export to file (start a download) */
//   XLSX.writeFile(wb, "SheetJSTable.xlsx");
// });


const exportToExcel = () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  // Define the column headers and styles
  const columns = table.columns.map((col, index) => ({
    header: col,
    key: col,
    width: 20,
    style: { font: { bold: true }, alignment: { horizontal: 'center' } }
  }));

  worksheet.columns = columns;

  // Add data rows
  [data.reduce((ount, input)=>{
    return {...ount, ...input};
  },{})].forEach((row, rowIndex) => {
    const rowData = table.columns.map((col,i) =>  table.values[i] || '');
    const excelRow = worksheet.addRow(rowData);

    // Apply styles to each cell based on the condition
    rowData.forEach((value, colIndex) => {
      const cell = excelRow.getCell(colIndex + 1);
      const prevValue = colIndex > 0 ? rowData[colIndex-1] : null;
        if ( colIndex%2 !== 0 && prevValue !== value) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } };
        }
    });
  });

  // Generate Excel file and save
  workbook.xlsx.writeBuffer().then(buffer => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'table_data.xlsx');
  });
};



  return (
    <div className="App">
      <button onClick={exportToExcel}>Download</button>
      <table ref={tbl}>
        <thead>
          <tr>
            {table.columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {table.values.map((value, index) => (
              <td key={index} style={index % 2 !== 0 && table.values[index - 1] !== value ? highlightStyle : {}}>{value.toString()}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
