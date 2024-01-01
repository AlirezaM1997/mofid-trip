import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import LoadingIndicator from "@modules/Loading-indicator";
import WalletTransactionCard from "@modules/wallet/transaction-card";
import NoResult from "@organisms/no-result";
import { Text } from "@rneui/themed";
import { WalletTransactionQueryType, useUserDetailQuery } from "@src/gql/generated";

const TransactionHistoryScreen = () => {
  const { data, loading } = useUserDetailQuery();

  if (!data || loading) return <LoadingIndicator />;

  return (
    <Container>
      <WhiteSpace size={32} />
      {data.userDetail.wallet.walletTransactions.length ? (
        data.userDetail.wallet.walletTransactions.map((transaction: WalletTransactionQueryType) => (
          <WalletTransactionCard key={transaction.id} transaction={transaction} />
        ))
      ) : (
        <Text center>تراکنشی وجود ندارد</Text>
      )}
    </Container>
  );
};

export default TransactionHistoryScreen;
