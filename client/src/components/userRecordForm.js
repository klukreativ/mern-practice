import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function UserRecordForm({form, handleSubmit, updateForm}) {
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