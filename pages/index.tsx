import { GetStaticProps } from 'next';

import Store from '../product/components/Store';
import api from '../product/api';
import { Product } from '../product/types';

interface Props {
  products: Product[];
}

const Home: React.FC<Props> = ({ products }) => {
  return <Store products={products} />;
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    revalidate: 10,
    props: {
      products,
    },
  };
};
