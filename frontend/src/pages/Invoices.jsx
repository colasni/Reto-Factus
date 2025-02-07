import React, { useEffect, useState } from "react";
import { Table, Container, Alert } from "react-bootstrap";
import apiInvoice from "../api/apiInvoice"

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await apiInvoice.get("/api/invoice/getinvoice", {
                    headers: {
                        "Cache-Control": "no-cache, no-store, must-revalidate", //se quita el cache ya que estaba dando error 304
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });
                setInvoices(response.data);
            } catch (err) {
                setError("Error al obtener las facturas");
                console.error("Error al obtener facturas:", err);
            }
        };
        fetchInvoices();
    }, []);

    return (
        <Container>
            <h2>Lista de Facturas</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Total</th>
                        <th>QR</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice, index) => (
                        <tr key={index}>
                            <td>{invoice.numero}</td>
                            <td>{invoice.nombre}</td>
                            <td>{invoice.email}</td>
                            <td>${invoice.total}</td>
                            <td>
                                <a href={invoice.qr} target="_blank" rel="noopener noreferrer">
                                    Ver QR
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Invoices;
