import React, { useState, useEffect } from "react";
import { Form, Button, Table, Container, Alert } from "react-bootstrap";
import apiClient from "../api/apiClient";

const InvoiceForm = () => {
    const [customer, setCustomer] = useState({
        identification: "",
        dv: "3",
        company: "",
        trade_name: "",
        names: "",
        address: "",
        email: "",
        phone: "",
        legal_organization_id: "2",
        tribute_id: "21",
        identification_document_id: "3",
        municipality_id: "980"
    });

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        code_reference: "1",
        name: "",
        quantity: 1,
        price: "",
        discount_rate: 20,
        tax_rate: "19.00",
        unit_measure_id: 70,
        standard_code_id: 1,
        is_excluded: 0,
        tribute_id: 1,
        withholding_taxes: []
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [referenceCode, setReferenceCode] = useState("");

    useEffect(() => {
        const getNextReferenceCode = () => {
            const lastRef = localStorage.getItem("lastReferenceCode");
            if (lastRef) {
                const match = lastRef.match(/FacturasNicolas(\d+)/);
                const nextNumber = match ? parseInt(match[1]) + 1 : 1;
                setReferenceCode(`FacturasNicolas${nextNumber}`);
            } else {
                setReferenceCode("FacturasNicolas1");
            }
        };
        getNextReferenceCode();
    }, []);

    const handleCustomerChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleItemChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const addItem = () => {
        if (newItem.name && newItem.price) {
            setItems([...items, newItem]);
            setNewItem({ code_reference: "", name: "", quantity: 1, price: "", tax_rate: "19.00", unit_measure_id: "70" });
        }
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const sendInvoice = async (invoiceData) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);
    
            const response = await apiClient.post("/v1/bills/validate", invoiceData);
            setSuccess("Factura generada con éxito 🎉");
    
            localStorage.setItem("lastReferenceCode", referenceCode);
            console.log("Factura enviada:", response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Error al generar la factura");
            console.error("Error al enviar la factura:", err.response);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const invoiceData = {
            numbering_range_id: 8,
            reference_code: referenceCode,
            observation: "",
            payment_form: "1",
            payment_due_date: "2024-12-30",
            payment_method_code: "10",
            billing_period: {
                start_date: "2024-01-10",
                start_time: "00:00:00",
                end_date: "2024-02-09",
                end_time: "23:59:59",
            },
            customer,
            items,
        };
        console.log(invoiceData)
        sendInvoice(invoiceData);
    };

    return (
        <Container className="invoice-form">
            <h2>Generar Factura</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
                <h4>Información del Cliente</h4>
                <Form.Group>
                    <Form.Label>Identificación</Form.Label>
                    <Form.Control type="text" name="identification" value={customer.identification} onChange={handleCustomerChange} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="names" value={customer.names} onChange={handleCustomerChange} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" name="address" value={customer.address} onChange={handleCustomerChange} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={customer.email} onChange={handleCustomerChange} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="text" name="phone" value={customer.phone} onChange={handleCustomerChange} required />
                </Form.Group>

                <h4>Productos</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.code_reference}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                                <td>
                                    <Button variant="danger" onClick={() => removeItem(index)}>
                                        X
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <h5>Agregar Producto</h5>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="name" value={newItem.name} onChange={handleItemChange} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control type="number" name="quantity" value={newItem.quantity} onChange={handleItemChange} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" name="price" value={newItem.price} onChange={handleItemChange} required />
                </Form.Group>

                <Button variant="primary" onClick={addItem}>Agregar Producto</Button>
                <Button variant="success" type="submit" disabled={loading}>{loading ? "Generando..." : "Generar Factura"}</Button>
            </Form>
        </Container>
    );
};

export default InvoiceForm;
