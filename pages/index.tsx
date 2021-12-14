import { Text, Grid, Stack, Button, Link } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { useMemo, useState } from 'react';

import api from '../product/api';
import { Product } from '../product/types';

interface Props {
  products: Product[];
}

const parseCurrency = (value: number): string => {
  return value.toLocaleString('es-UY', {
    style: 'currency',
    currency: 'UYU',
  });
};

const Home: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const text = useMemo(
    () =>
      cart
        .reduce(
          (message, product) =>
            message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`),
          '',
        )
        .concat(
          `\nTotal: ${parseCurrency(cart.reduce((total, product) => (total += product.price), 0))}`,
        ),
    [cart],
  );

  const addItem = (product: Product) => {
    setCart([product, ...cart]);
  };

  return (
    <>
      <Stack>
        <h1>Index</h1>
        <Grid gap="6" templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
          {products.map((product) => (
            <Stack key={product.id} bgColor="gray.100" p="4">
              <Text>{product.title}</Text>
              <Text>{parseCurrency(product.price)}</Text>
              <Button colorScheme="purple" onClick={() => addItem(product)}>
                Agregar
              </Button>
            </Stack>
          ))}
        </Grid>
        {cart.length && (
          <Button
            isExternal
            as={Link}
            colorScheme="whatsapp"
            href={`https://wa.me/59898903828?text=${encodeURIComponent(text)}`}
          >
            Completar Pedido({cart.length})
          </Button>
        )}
      </Stack>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  console.log(products);

  return {
    props: {
      products,
    },
  };
};
