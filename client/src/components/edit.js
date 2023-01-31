import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import UserRecordForm from './userRecordForm';

export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
        records: []
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has ocurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }

            setForm(record);
        }
        fetchData();

        return;
    }, [params.id, navigate]);

    const updateForm = (value) => {
        return setForm((prev) => {
            return { ...prev, ...value }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const editedPerson = {
            name: form.name,
            position: form.position,
            level: form.level
        };

        // this sends a POST req to update data in db
        await fetch(`http://localhost:5000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedPerson),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        navigate("/");
    };

    return (
        <UserRecordForm
            form={form}
            handleSubmit={handleSubmit}
            updateForm={updateForm}
        />
    )
}