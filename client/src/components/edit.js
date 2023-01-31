import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
                <Button type="submit">Update Record</Button>
            </Form.Group>
        </Form>
    )
}