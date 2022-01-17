import { Text, Stack, Button, Heading, Image, Badge } from '@chakra-ui/react';
import { useMemo } from 'react';

import { parseCurrency } from '../../utils/currency';

const ProductCard = ({ product, onAdd }) => {
  const cartItem = useMemo(() => ({ ...product, quantity: 1, id: String(+new Date()) }), [product]);

  return (
    <Stack
      borderColor="gray.200"
      borderRadius="md"
      borderStyle="solid"
      borderWidth="1px"
      direction="row"
      justifyContent="space-between"
      spacing={0}
    >
      <Stack flexGrow="1" padding={4} spacing={6}>
        <Stack spacing={2}>
          <Badge alignSelf="flex-start" fontSize="xs" textTransform="initial">
            {product.category}
          </Badge>
          <Heading fontWeight="bold" size="sm">
            {product.title}
          </Heading>
          <Text color="gray.400" fontSize="sm">
            {product.description}
          </Text>
        </Stack>
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Text color="green.500" fontSize="sm" fontWeight="600">
            {parseCurrency(product.price)}
          </Text>
          <Button size="sm" onClick={() => onAdd(cartItem)}>
            Agregar
          </Button>
        </Stack>
      </Stack>
      {Boolean(product.image) && (
        <Image
          key="image"
          alt={product.title}
          height="100%"
          objectFit="cover"
          src={product.image}
          width="150px"
        />
      )}
    </Stack>
  );
};

export default ProductCard;
