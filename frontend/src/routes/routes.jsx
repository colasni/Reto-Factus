import React from "react";
import Home from "../pages/Home";
import Invoices from "../pages/Invoices";
import InvoiceForm from "../pages/AddInvoice";
import ProtectedRoute from "./ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/invoices",
    element: <ProtectedRoute element={<Invoices />} />,
  },
  {
    path: "/invoice-form",
    element: <ProtectedRoute element={<InvoiceForm />} />,
  },
];

export default routes;


