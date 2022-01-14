import { Text, Stack, Button, Heading, Image } from '@chakra-ui/react';
import { useMemo } from 'react';

import { parseCurrency } from '../../utils/currency';

const ProductCard = ({ product, onAdd }) => {
  const cartItem = useMemo(() => ({ ...product, quantity: 1, id: String(+new Date()) }), [product]);

  return (
    <Stack bgColor="white" borderRadius="md" p="4">
      {Boolean(product.image) && (
        <Image
          key="image"
          alt={product.title}
          height="150px"
          objectFit="cover"
          src={product.image}
          width="100%"
        />
      )}
      <Text color="gray.500" fontSize="xs">
        {product.category}
      </Text>
      <Heading fontWeight="bold" size="sm">
        {product.title}
      </Heading>
      <Text color="green.500" fontSize="sm" fontWeight="600">
        {parseCurrency(product.price)}
      </Text>
      <Button colorScheme="primary" onClick={() => onAdd(cartItem)}>
        Agregar
      </Button>
    </Stack>
  );
};

export default ProductCard;
