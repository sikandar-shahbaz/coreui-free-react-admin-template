import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [tableHeightPixels] = useState(500)
  const [tableWidthPixels] = useState(1000)
  const [data, setData] = useState([])
  const [rows, setRows] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:8080/data`).then((res) => {
      const data = res.data
      const array = data.map((element) => element.Score)
      const numberOfRows = Math.max(...array)
      const rows = []
      for (let i = 1; i <= numberOfRows; i++) {
        rows.push(i)
      }
      setRows(rows)
      setData(data)
    })
  }, [])

  return (
    <div 
      style={{ 
        padding: '20px',
        textAlign: 'center'
      }}
    >
      <h2>Student Report</h2>
      <div style={{ display: 'flex' }}>
        {
          rows &&
          rows.length > 0 &&
          <div
            style={{ 
              height: tableHeightPixels+ 'px',
              display: 'table',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'table-cell',
                verticalAlign: 'middle',
                transform: 'rotate(-90deg)'
              }}
            >
              <h4>Score</h4>
            </div>
          </div>
        }
        <div>
        {
          rows &&
          rows.length > 0 &&
          rows.map((row) => (
            <tr 
              key={row}
              style={{ 
                height: tableHeightPixels/rows.length + 'px',
              }}
            >
              <td>
                <h4>{(rows.length + 1) - row}</h4>
              </td>
            </tr>
          ))
        }
        </div>
        <div>
          <div
            style={{
              height: tableHeightPixels + 15 + 'px',
              maxWidth: tableWidthPixels + 'px',
              borderLeft: '15px solid red',
              borderBottom: '15px solid red',
            }}
          >
            <table>
            {
              data &&
              rows &&
              data.length > 0 &&
              rows.length > 0 &&
              rows.map(row=> (
                <tr 
                  key={row} 
                  style={{ 
                    height: tableHeightPixels/rows.length + 'px',
                  }}
                >
                  {
                    data.map(element => (
                      <td 
                        key={element.Student}
                        style={{ 
                          width: tableWidthPixels/data.length + 'px',
                          backgroundColor: (rows.length) - row >= element.Score ? 'transparent' : 'yellow',
                          borderLeft: (rows.length) - row >= element.Score ? 'transparent' : '1px solid black',
                          borderRight: (rows.length) - row >= element.Score ? 'transparent' : '1px solid black',
                          borderTop: (rows.length) - row >= element.Score ? 'transparent' : '1px solid black',
                        }}
                      />
                    ))
                  }
                </tr>
              ))
            }
            </table>
          </div>
          <div style={{marginLeft: '15px'}}>
            <tr>
            {
              data &&
              data.length > 0 &&
              data.map(element => (
                <td 
                  key={element.Student}
                  style={{ 
                    width: tableWidthPixels/data.length + 'px',
                  }}
                >
                  <h4>{element.Student}</h4>
                </td>
              ))
            }
            </tr>
            <div
              style={{
                width: tableWidthPixels + 'px',
              }}
            >
              <h4>Student</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
