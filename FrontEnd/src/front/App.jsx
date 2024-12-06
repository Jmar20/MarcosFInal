import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import { FullFormsPage } from "./Screens/FullFormsPage";
import { Dashboard } from "./Screens/Dashboard";
import ProtectedRoutes from "./Components/Utils/ProtectedRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<FullFormsPage formType="login" />} />
                    <Route path="/register" element={<FullFormsPage formType="register" />} />
                    <Route path="/recuperar" element={<FullFormsPage formType="recuperar" />} />
                    <Route element={<ProtectedRoutes canActivate={token} />}>
                        <Route path="/menu" element={<Dashboard rightType="home" setToken={setToken}/>} />
                        <Route path="/menu/clientes" element={<Dashboard rightType="clientes" setToken={setToken}/>} />
                        <Route path="/menu/ordenes" element={<Dashboard rightType="ordenes" setToken={setToken}/>} />
                        <Route path="/menu/inventario" element={<Dashboard rightType="inventario" setToken={setToken}/>} />
                        <Route path="/menu/informes" element={<Dashboard rightType="informes" setToken={setToken}/>} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </>
    )
}