import { RootState } from "@src/store";
import Container from "@atoms/container";
import { useSelector } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import { WalletTransactionQueryType } from "@src/gql/generated";
import WalletTransactionCard from "@modules/wallet/transaction-card";

const TransactionHistoryScreen = () => {
  const { walletTransactions } = useSelector(
    (state: RootState) => state.userSlice.userDetail.wallet
  );

  return (
    <Container>
      <WhiteSpace size={32} />
      {walletTransactions.map((transaction: WalletTransactionQueryType) => (
        <WalletTransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </Container>
  );
};

export default TransactionHistoryScreen;
