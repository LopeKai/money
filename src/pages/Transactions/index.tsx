import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighLight, TransactionContainer, TransactionTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

export function Transactions() {
    const { transactions } = useContext(TransactionsContext)

    return (
        <div>
            <Header />

            <Summary />

            <TransactionContainer>
                <SearchForm />

                <TransactionTable>
                    <tbody>
                        {
                            transactions.map(transaction => {
                                return (
                                    <tr key={transaction.id}>
                                        <td width="50%">
                                            {transaction.description}
                                        </td>
                                        <td>
                                            <PriceHighLight variant={transaction.type}>
                                                {
                                                    transaction.type === 'outcome' && ' - '
                                                }
                                                {
                                                    priceFormatter.format(transaction.price)
                                                }
                                            </PriceHighLight>
                                        </td>
                                        <td>
                                            {transaction.category}
                                        </td>
                                        <td>
                                            {
                                                dateFormatter.format(new Date(transaction.createAt))
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </TransactionTable>
            </TransactionContainer>

        </div>
    )
}