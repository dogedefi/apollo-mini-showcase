import usePagination from '@/hooks/usePagination';
import { gql } from '@apollo/client';
import styles from './index.less';

export default function IndexPage() {
  const { list } = usePagination({
    gql: gql`
      query MyQuery($address: String!) {
        addressTags(address: $address) {
          tag
          tokenAddress
          tokenName
          tokenSymbol
        }
      }
    `,
    view: 'addressTags',
    params: {
      address: '0x743F232Eee66406FDe99Af1E106ed7F32011073d',
    },
  });
  console.log(list);

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
