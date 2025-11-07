'use client'

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import Modal from 'react-modal';

interface ClientWrapperProps {
    children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}