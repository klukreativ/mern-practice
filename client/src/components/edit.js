import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

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
        await fetch(`https://localhost:5000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedPerson),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        navigate("/");
    };

    return (
        <div className="col-10 col-lg-4 container-fluid justify-content-center card my-5 p-3">
            <h3 className="text-center pt-3">Update Record</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="py-3">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    >
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="position" className="py-3">Position:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.position}
                        onChange={(e) => updateForm({ position: e.target.value })}
                    ></input>
                </div>
                <div className="form-group py-5 d-flex justify-content-around">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionIntern"
                            value="Intern"
                            checked={form.level === "Intern"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionJunior"
                            value="Junior"
                            checked={form.level === "Junior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionSenior"
                            value="Senior"
                            checked={form.level === "Senior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionSenior" className="form-check-label">Junior</label>
                    </div>
                </div>
                <div className="form-group text-center pb-3">
                    <input
                        type="submit"
                        value="Update Record"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    )
}