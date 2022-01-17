import {
  ChakraProvider,
  Container,
  VStack,
  Image,
  Heading,
  Text,
  Divider,
  Link,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { AppProps } from 'next/app';

import { INFORMATION } from '../app/constants';
import theme from '../theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl">
        <Stack
          overflow="hidden"
          position="relative"
          px={{ base: 0, md: 6 }}
          py={{ base: 4, md: 6 }}
        >
          <Image
            alt={INFORMATION.title}
            borderRadius="lg"
            height="100%"
            maxHeight={{ base: '48', md: '64' }}
            objectFit="cover"
            src={INFORMATION.banner}
            width="100%"
          />
          <Stack
            alignItems="center"
            direction={{ base: 'column', md: 'row' }}
            position="relative"
            spacing={{ base: 1, md: 6 }}
          >
            <Image
              alt="avatar"
              borderColor="white"
              borderRadius="9999"
              borderStyle="solid"
              borderWidth="4px"
              mt="-10"
              src={INFORMATION.avatar}
              width={{ base: '94px', md: '128px' }}
            />
            <Stack spacing="1" textAlign={{ base: 'center', md: 'left' }}>
              <Heading fontWeight="bold" mb="0">
                {INFORMATION.title}
              </Heading>
              <Text color="gray.600">{INFORMATION.description}</Text>
            </Stack>
            <Stack direction="row" flexGrow="1" justifyContent="flex-end">
              {INFORMATION.social.map((social) => (
                <Link
                  key={social.name}
                  isExternal
                  alignItems="center"
                  backgroundColor="primary.500"
                  borderRadius={99999}
                  color="white"
                  display="flex"
                  height={10}
                  href={social.url}
                  justifyContent="center"
                  width={10}
                >
                  <Image
                    alt={social.name}
                    src={`https://icongr.am/fontawesome/${social.name}.svg?size=24&color=ffffff`}
                  />
                </Link>
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Divider my={6} />
        <Component {...pageProps} />
        <Divider marginY={6} />
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
