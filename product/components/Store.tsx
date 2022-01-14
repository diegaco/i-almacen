import { Grid, Stack, Button, Link, HStack, Text, Flex } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import CartDrawer from '../../cart/CartDrawer';
import { CartItem } from '../../cart/types';
import { getCartQuantity, getCartTotal } from '../../cart/utils';
import { parseCurrency } from '../../utils/currency';
import { Product } from '../types';

import ProductCard from './ProductCard';

const Store = ({ products }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

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

  const total = useMemo(() => getCartTotal(cart), [cart]);
  const quantity = useMemo(() => getCartQuantity(cart), [cart]);

  const handleAddItem = (item: CartItem) => {
    setCart((cart) => [...cart, { ...item, id: String(new Date()) }]);
  };

  const handleIncrementItem = (item: CartItem) => {
    setCart((cart) => {
      return cart.reduce((acc, _item) => {
        if (item.id != _item.id) {
          return acc.concat(_item);
        }

        return acc.concat({ ..._item, quantity: _item.quantity + 1 });
      }, []);
    });
  };

  const handleDecrementItem = (item: CartItem) => {
    setCart((cart) => {
      return cart.reduce((acc, _item) => {
        if (item.id !== _item.id) {
          return acc.concat(_item);
        }

        if (_item.quantity === 1) {
          return acc;
        }

        return acc.concat({ ..._item, quantity: _item.quantity - 1 });
      }, []);
    });
  };

  return (
    <>
      <Stack spacing={6}>
        {products.length ? (
          <Grid
            gap="8"
            templateColumns={{
              base: 'repeat(auto-fill, minmax(240px, 1fr))',
              sm: 'repeat(auto-fill, minmax(360px, 1fr))',
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={handleAddItem} />
            ))}
          </Grid>
        ) : (
          <Text color="gray.500" fontSize="lg" margin="auto">
            No hay productos
          </Text>
        )}
        {cart.length && (
          <Flex alignItems="center" bottom={4} justifyContent="center" position="sticky">
            <Button
              boxShadow="xl"
              colorScheme="primary"
              data-testid="show-cart"
              size="lg"
              width={{ base: '100%', sm: 'fit-content' }}
              onClick={() => setCartOpen(true)}
            >
              <Stack alignItems="center" direction="row" spacing={6}>
                <Stack alignItems="center" direction="row" spacing={3}>
                  <Text fontSize="md" lineHeight={6}>
                    Ver pedido
                  </Text>
                  <Text
                    backgroundColor="rgba(0,0,0,0.25)"
                    borderRadius="sm"
                    color="gray.100"
                    fontSize="xs"
                    fontWeight="500"
                    paddingX={2}
                    paddingY={1}
                  >
                    {quantity} items
                  </Text>
                </Stack>
                <Text fontSize="md" lineHeight={6}>
                  {total}
                </Text>
              </Stack>
            </Button>
          </Flex>
        )}
      </Stack>
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onDecrement={handleDecrementItem}
        onIncrement={handleIncrementItem}
      />
    </>
  );
};

export default Store;
