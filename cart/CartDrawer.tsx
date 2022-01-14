import {
  Button,
  Image,
  CloseButton,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useMemo } from 'react';

import { parseCurrency } from '../utils/currency';

import { CartItem } from './types';
import { getCartItemPrice, getCartQuantity, getCartTotal } from './utils';

interface Props extends Omit<DrawerProps, 'children'> {
  items: CartItem[];
  onIncrement: (item: CartItem) => void;
  onDecrement: (item: CartItem) => void;
}

const CartDrawer: React.FC<Props> = ({ items, onClose, onDecrement, onIncrement, ...props }) => {
  const total = useMemo(() => getCartTotal(items), [items]);
  const quantity = useMemo(() => getCartQuantity(items), [items]);

  return (
    <>
      <Drawer placement="right" size="sm" onClose={onClose} {...props}>
        <DrawerOverlay />
        <DrawerContent paddingTop={4}>
          <DrawerHeader paddingX={4}>
            <Stack alignItems="center" direction="row" justifyContent="space-between">
              <Stack direction="row" fontSize={{ base: '2xl', sm: '3xl' }} fontWeight="500">
                <Text>Tu pedido</Text> <Text color="gray.400">({quantity})</Text>
              </Stack>
              <CloseButton onClick={onClose} />
            </Stack>
          </DrawerHeader>

          <DrawerBody data-testid="cart" paddingX={4}>
            {items.length ? (
              <Stack divider={<Divider />} spacing={4}>
                {items.map((item) => (
                  <Stack key={item.id} data-testid="cart-item" direction="row">
                    <Stack width="100%">
                      <Stack alignItems="flex-start" direction="row" justifyContent="space-between">
                        <Stack spacing={0}>
                          <Text fontSize="lg" fontWeight="500">
                            {item.title}
                          </Text>
                        </Stack>
                        <Text fontWeight="500">{parseCurrency(getCartItemPrice(item))}</Text>
                      </Stack>
                      <Stack direction="row">
                        <Button
                          borderRadius={9999}
                          colorScheme="primary"
                          data-testid="decrement"
                          size="xs"
                          onClick={() => onDecrement(item)}
                        >
                          {' '}
                          -{' '}
                        </Button>
                        <Text data-testid="quantity" fontWeight="500">
                          {item.quantity}
                        </Text>
                        <Button
                          borderRadius={9999}
                          colorScheme="primary"
                          data-testid="increment"
                          size="xs"
                          onClick={() => onIncrement(item)}
                        >
                          {' '}
                          +{' '}
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            ) : (
              <Text color="gray.400">No hay elementos en tu carrito</Text>
            )}
          </DrawerBody>

          <DrawerFooter>
            {Boolean(items.length) && (
              <DrawerFooter paddingX={4}>
                <Stack spacing={4} width="100%">
                  <Divider />
                  <Stack
                    alignItems="center"
                    direction="row"
                    fontSize="lg"
                    fontWeight="500"
                    justifyContent="space-between"
                  >
                    <Text>Total</Text>
                    <Text>{total}</Text>
                  </Stack>
                  <Button
                    isExternal
                    as={Link}
                    colorScheme="whatsapp"
                    data-testid="complete-order"
                    // href={`https://wa.me/5491141414141?text=${encodeURIComponent(text)}`}
                    leftIcon={
                      <Image
                        alt="whatsapp"
                        src="https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff"
                      />
                    }
                    size="lg"
                    width="100%"
                  >
                    Completar pedido
                  </Button>
                </Stack>
              </DrawerFooter>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
