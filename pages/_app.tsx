import {
  ChakraProvider,
  Container,
  VStack,
  Image,
  Heading,
  Text,
  Divider,
  Link,
} from '@chakra-ui/react';
import { AppProps } from 'next/app';

import { INFORMATION } from '../app/constants';
import theme from '../theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl">
        <VStack>
          <Image alt="avatar" borderRadius="9999" src={INFORMATION.avatar} />
          <Heading>{INFORMATION.title}</Heading>
          <Text>{INFORMATION.description}</Text>
        </VStack>
        <Divider my={6} />
        <Component {...pageProps} />
        <Divider marginY={4} />
        {/* Inicio de copyright - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
        <Text textAlign="center">
          © Copyright {new Date().getFullYear()}. Hecho con ♥ siguiendo el tutorial de{' '}
          <Link isExternal href="https://www.youtube.com/channel/UCCvaRcYdZCZBrBQVnsUBg5Q">
            Goncy
          </Link>
          .
        </Text>
        {/* Fin de copyright */}
      </Container>
    </ChakraProvider>
  );
};

export default App;
