"use client";

import { useCallback } from "react";

export function usePaystackPayment() {
    const initializePayment = useCallback((config: any, onSuccess: () => void, onClose: () => void) => {
        const handler = (window as any).PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
            email: config.email,
            amount: config.amount * 100,
            ref: new Date().getTime().toString(),
            metadata: config.metadata,
            callback: onSuccess,
            onClose,
        });
        handler.openIframe();
    }, []);

    return initializePayment;
}
