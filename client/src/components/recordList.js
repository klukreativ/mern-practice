import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
    <tr className="row justify-content-around">
        <td className="col">{props.record.name}</td>
        <td className="col">{props.record.position}</td>
        <td>{props.record.level}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/#{props.record._id}`}>Edit</Link>
            |
            <button className="btn btn-link" onClick={() => { props.deleteRecord(props.record._id); }}>Delete</button>
        </td>
    </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // fetches records from db
    useEffect(() => {
        const getRecords = async () => {
            const response = await fetch(`http://localhost:5000/record`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length])

    // method to delete record
    const deleteRecord = async (id) => {
        await fetch(`https://localhost:5000/${id}`, {
            method: "DELETE"
        });
        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    // maps record to table
    const recordList = () => {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            )
        })
    }

    //displays table with records of individuals
    return (
        <div className="container-fluid text-center justify-content-center p-5">
            <h3>Record List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr className="row justify-content-around">
                        <th className="col">Name</th>
                        <th className="col">Position</th>
                        <th className="col">Level</th>
                        <th className="col">Action</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    )
}