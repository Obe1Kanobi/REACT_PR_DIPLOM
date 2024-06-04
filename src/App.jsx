import React from 'react';
import {CryptoContextProvider} from "./context/crypto-context.jsx";
import AppLayout from "./Components/Layout/AppLayout.jsx";

export default function App() {
    return (
        <CryptoContextProvider>
            <AppLayout />
            </CryptoContextProvider>
            )
        }

