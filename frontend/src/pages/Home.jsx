import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <Container className="mt-5">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="text-center mb-4"
            >
                Facturación Electrónica para la DIAN
            </motion.h1>
            
            <Row className="justify-content-center">
                <Col md={8}>
                    <motion.p 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1 }}
                        className="text-muted text-justify"
                    >
                        La <strong>facturación electrónica</strong> en Colombia es un proceso obligatorio regulado por la <strong>Dirección de Impuestos y Aduanas Nacionales (DIAN)</strong>. Este sistema digital permite emitir, validar y almacenar facturas de manera eficiente, reduciendo costos y optimizando la gestión contable.
                    </motion.p>
                    
                    <motion.ul 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ delay: 0.5, duration: 1 }}
                        className="list-group list-group-flush"
                    >
                        <li className="list-group-item">✅ Generación de facturas con estándares DIAN</li>
                        <li className="list-group-item">✅ Validación en tiempo real</li>
                        <li className="list-group-item">✅ Reducción de fraude y errores</li>
                        <li className="list-group-item">✅ Integración con múltiples plataformas</li>
                    </motion.ul>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 1, duration: 0.5 }}
                        className="mt-4 text-center"
                    >
                        <p className="font-weight-bold">¡Simplifica tu facturación y cumple con la DIAN de manera rápida y segura! 🚀</p>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
