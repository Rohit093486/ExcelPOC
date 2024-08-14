import React from 'react'
import '../App.css';
const data = [
    { source1: "Text", target1: "Text" },
    { source2: "Text", target2: "Text-D" },
    { source3: true, target3: true },
    { source4: true, target4: false },
    { source5: 100, target5: 100 },
    { source6: 100, target6: 100.5 },
  ];
export default function Table() {

    const highlightStyle = { backgroundColor: 'yellow' };
    return (
        <div className="App">
            <table>
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Target</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.source.toString()}</td>
                            <td style={row.source !== row.target ? highlightStyle : {}}>{row.target.toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
