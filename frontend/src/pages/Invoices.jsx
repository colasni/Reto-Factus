import React, { useEffect, useState } from "react";
import { Table, Container, Alert, Button } from "react-bootstrap";
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

    const handleDownload = (base64Data) => {
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "facturaElectronica.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                        <th>Documento</th>
                        <th>pdf</th>
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
                                    Ver Documento
                                </a>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDownload(invoice.pdf_base_64_encoded)}>
                                    Download
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Invoices;
