import React, { useState } from "react";
import { useNavigate } from "react-router";
import UserRecordForm from './userRecordForm';

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: ""
    });
    const navigate = useNavigate();

    const updateForm = (value) => {
        return setForm((prev) => {
            return { ...prev, ...value }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // when a POST req is sent to the create URL, add new record to db
        const newPerson = { ...form };

        await fetch("http://localhost:5000/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ name: "", position: "", level: "" });
        navigate("/");
    }

    return (
        <UserRecordForm
            form={form}
            handleSubmit={handleSubmit}
            updateForm={updateForm}
        />
    )
}