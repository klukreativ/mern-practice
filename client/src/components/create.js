import React, { useState } from "react";
import { useNavigate } from "react-router";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
        <Form onSubmit={handleSubmit} className="col-10 col-lg-4 container-fluid justify-content-center card my-5 p-3">
            <h3 className="text-center pt-3">Create New Record</h3>
            <Form.Group
                className="mb-3"
                controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="formPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Position"
                    value={form.position}
                    onChange={(e) => updateForm({ position: e.target.value })}
                />
            </Form.Group>
            <Form.Group
                className="py-3 d-flex justify-content-around" controlId="formLevel"
            >
                {["Intern", "Junior", "Senior"].map((level) => (
                    <Form.Check
                        key={level}
                        inline
                        type="radio"
                        label={level}
                        name="positionOptions"
                        id={`position${level}`}
                        value={level}
                        checked={form.level === level}
                        onChange={(e) => updateForm({ level: e.target.value })}
                    />
                ))}
            </Form.Group>
            <Form.Group className="text-center py-3">
                <Button type="submit">Create Person</Button>
            </Form.Group>
        </Form>
    )
}