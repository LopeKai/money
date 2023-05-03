import { createContext, ReactNode, useState, useEffect } from 'react'

interface Transactions {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createAt: string;
}

interface TransactionContextType {
    transactions: Transactions[]
}

export const TransactionsContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
    children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transactions[]>([])

    async function loadTransactions() {
        const response = await fetch("http://localhost:3333/transactions")
        const data = await response.json()

        setTransactions(data)
    }

    useEffect(() => {
        loadTransactions();
    }, [])

    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider >
    )
}