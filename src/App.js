import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';



export default function TableExample() {


  const [results, setResults] = useState()
  const [type, setType] = useState()
  const [refetchIssues, setRefetchIssues] = useState(false)



  useEffect(() => {
    (async () => {
      const res = await axios.get('http://localhost:2000/api/issues')
      setResults(res.data)
    })();
  }, [refetchIssues])



  const handleChange = async (issueId) => {
    const payload = {
      issueId,
      type,
    }
    const updateIssu = await axios.post('http://localhost:2000/api/issues/update', payload)
    console.log(updateIssu)
    if (updateIssu.data.modifiedCount === 1) {
      setRefetchIssues(true)
    }
  }

  return (
    <>


      <div className='container'>
        <Table stripped bordered hover size="sm">
          <thead>
            <tr>
              <th width="170">Title</th>
              <th width="170">Description</th>
              <th width="170">status</th>
              <th width="870">action</th>


            </tr>
          </thead>
          <tbody>
            {results && results.map((issues, i) => (
              <tr>

                <td>{issues.title}</td>
                <td>{issues.description}</td>
                <td>{issues.status}</td>
              {issues.status === 'closed' ?"":   <td>
                  <select onChange={(e) => setType(e.target.value)}>
                    <option  >Select Status</option>
                    {issues.state.map((status) => (
                      <option value={status.type} >{status.type}</option>

                    ))}

                  </select>
                  <Button variant="primary" onClick={() => handleChange(issues._id)}>Submit State</Button>

                </td>}
                
              </tr>
            ))}



          </tbody>
        </Table>

      </div>



    </>
  );
}
