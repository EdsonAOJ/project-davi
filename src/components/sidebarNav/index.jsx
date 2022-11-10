import {
  Stack,
  Link as ChakraLink,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/authContext';
import { useContext } from 'react';
import {
  headerFlexAnimation,
  MotionFlex,
  sidebarAnimation,
} from '../Animation/AnimationFlex';

export const SidebarNav = () => {
  const { handleLogOut } = useContext(Context);

  return (
    <MotionFlex
      flexDir="column"
      variants={headerFlexAnimation}
      initial="hidden"
      animate="visible"
      align="center"
      h="100%"
      w="100%"
    >
      <MotionFlex
        variants={sidebarAnimation}
        initial="hidden"
        animate="visible"
        h="100%"
        w="100%"
      >
        {window.location.pathname === '/' ? (
          <Flex
            w="100%"
            flexDir={'column'}
            align={'center'}
            justify="center"
            color="white"
          >
            <Text
              fontWeight={'bold'}
              fontSize="2.2rem"
              fontStyle={'normal'}
              whiteSpace="nowrap"
              overflow={'hidden'}
            >
              Bem-Vindo de volta
            </Text>
            <Text fontSize="1.1rem" fontWeight="bold">
              Acesse sua conta agora mesmo
            </Text>
          </Flex>
        ) : (
          <Flex
            w="100%"
            mt="3rem"
            flexDir={'column'}
            align={'center'}
            justify="space-between"
          >
            <Stack
              spacing="8"
              mt="6"
              align="stretch"
              h="calc(100vh - 220px)"
              overflow={'auto'}
              // pr="5"
              css={{
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#23A07B',
                  borderRadius: '24px',
                },
              }}
              pr="1"
            >
              <Link to="/users">
                <Button
                  bg="#11FFB8"
                  color="white"
                  p="2.3rem"
                  w="14rem"
                  fontSize={'1.4rem'}
                  borderRadius={'30px'}
                  border="1px"
                  borderColor={
                    window.location.pathname.includes('/users')
                      ? 'gray.100'
                      : 'white'
                  }
                  _hover={{
                    opacity: '0.8',
                  }}
                  _active={{
                    opacity: '0.8',
                  }}
                >
                  <ChakraLink
                    display="flex"
                    align="center"
                    color={
                      window.location.pathname.includes('/users')
                        ? 'gray.100'
                        : 'white'
                    }
                  >
                    USUÁRIOS
                  </ChakraLink>
                </Button>
              </Link>

              <Link to="/providers">
                <Button
                  bg="#11FFB8"
                  color="white"
                  p="2.3rem"
                  w="14rem"
                  fontSize={'1.4rem'}
                  borderRadius={'30px'}
                  border="1px"
                  borderColor={
                    window.location.pathname.includes('/providers')
                      ? 'gray.100'
                      : 'white'
                  }
                  _hover={{
                    opacity: '0.8',
                  }}
                  _active={{
                    opacity: '0.8',
                  }}
                >
                  <ChakraLink
                    display="flex"
                    align="center"
                    color={
                      window.location.pathname.includes('/providers')
                        ? 'gray.100'
                        : 'white'
                    }
                  >
                    FORNECEDOR
                  </ChakraLink>
                </Button>
              </Link>
              <Link to="/products">
                <Button
                  bg="#11FFB8"
                  color="white"
                  p="2.3rem"
                  w="14rem"
                  fontSize={'1.4rem'}
                  borderRadius={'30px'}
                  border="1px"
                  borderColor={
                    window.location.pathname.includes('/products')
                      ? 'gray.100'
                      : 'white'
                  }
                  _hover={{
                    opacity: '0.8',
                  }}
                  _active={{
                    opacity: '0.8',
                  }}
                >
                  <ChakraLink
                    display="flex"
                    align="center"
                    color={
                      window.location.pathname.includes('/products')
                        ? 'gray.100'
                        : 'white'
                    }
                  >
                    PRODUTOS
                  </ChakraLink>
                </Button>
              </Link>
              <Link to="/properties">
                <Button
                  bg="#11FFB8"
                  color="white"
                  p="2.3rem"
                  w="14rem"
                  fontSize={'1.4rem'}
                  borderRadius={'30px'}
                  border="1px"
                  borderColor={
                    window.location.pathname.includes('/properties')
                      ? 'gray.100'
                      : 'white'
                  }
                  _hover={{
                    opacity: '0.8',
                  }}
                  _active={{
                    opacity: '0.8',
                  }}
                >
                  <ChakraLink
                    display="flex"
                    align="center"
                    color={
                      window.location.pathname.includes('/properties')
                        ? 'gray.100'
                        : 'white'
                    }
                  >
                    PROPRIEDADES
                  </ChakraLink>
                </Button>
              </Link>
              <Link to="/clients">
                <Button
                  bg="#11FFB8"
                  color="white"
                  p="2.3rem"
                  w="14rem"
                  fontSize={'1.4rem'}
                  borderRadius={'30px'}
                  border="1px"
                  borderColor={
                    window.location.pathname.includes('/clients')
                      ? 'gray.100'
                      : 'white'
                  }
                  _hover={{
                    opacity: '0.8',
                  }}
                  _active={{
                    opacity: '0.8',
                  }}
                >
                  <ChakraLink
                    display="flex"
                    align="center"
                    color={
                      window.location.pathname.includes('/clients')
                        ? 'gray.100'
                        : 'white'
                    }
                  >
                    CLIENTES
                  </ChakraLink>
                </Button>
              </Link>

              <Link to="/talhao">
                <Button
                  bg="#11FFB8"
                  color="white"
                  p="2.3rem"
                  w="14rem"
                  fontSize={'1.4rem'}
                  borderRadius={'30px'}
                  border="1px"
                  borderColor={
                    window.location.pathname.includes('/talhao')
                      ? 'gray.100'
                      : 'white'
                  }
                  _hover={{
                    opacity: '0.8',
                  }}
                  _active={{
                    opacity: '0.8',
                  }}
                >
                  <ChakraLink
                    display="flex"
                    align="center"
                    color={
                      window.location.pathname.includes('/talhao')
                        ? 'gray.100'
                        : 'white'
                    }
                  >
                    TALHÃO
                  </ChakraLink>
                </Button>
              </Link>

              <Link to="/purchase">
                <Button
                  bg="#11FFB8"
                  color="white"
                  p="2.3rem"
                  w="14rem"
                  fontSize={'1.4rem'}
                  borderRadius={'30px'}
                  border="1px"
                  borderColor={
                    window.location.pathname.includes('/purchase')
                      ? 'gray.100'
                      : 'white'
                  }
                  _hover={{
                    opacity: '0.8',
                  }}
                  _active={{
                    opacity: '0.8',
                  }}
                >
                  <ChakraLink
                    display="flex"
                    align="center"
                    color={
                      window.location.pathname.includes('/purchase')
                        ? 'gray.100'
                        : 'white'
                    }
                  >
                    COMPRA
                  </ChakraLink>
                </Button>
              </Link>

              <Link to="/application">
                <Button
                  bg="#11FFB8"
                  color="white"
                  p="2.3rem"
                  w="14rem"
                  fontSize={'1.4rem'}
                  borderRadius={'30px'}
                  border="1px"
                  borderColor={
                    window.location.pathname.includes('/application')
                      ? 'gray.100'
                      : 'white'
                  }
                  _hover={{
                    opacity: '0.8',
                  }}
                  _active={{
                    opacity: '0.8',
                  }}
                >
                  <ChakraLink
                    display="flex"
                    align="center"
                    color={
                      window.location.pathname.includes('/application')
                        ? 'gray.100'
                        : 'white'
                    }
                  >
                    APLICAÇÃO
                  </ChakraLink>
                </Button>
              </Link>

              <Link to="/report">
                <Button
                  bg="#11FFB8"
                  color="white"
                  p="2.3rem"
                  w="14rem"
                  fontSize={'1.4rem'}
                  borderRadius={'30px'}
                  border="1px"
                  borderColor={
                    window.location.pathname.includes('/report')
                      ? 'gray.100'
                      : 'white'
                  }
                  _hover={{
                    opacity: '0.8',
                  }}
                  _active={{
                    opacity: '0.8',
                  }}
                >
                  <ChakraLink
                    display="flex"
                    align="center"
                    color={
                      window.location.pathname.includes('/report')
                        ? 'gray.100'
                        : 'white'
                    }
                  >
                    RELATORIOS
                  </ChakraLink>
                </Button>
              </Link>
            </Stack>

            <Button
              bg="#11FFB8"
              color="white"
              p="2.3rem"
              w="14rem"
              fontSize={'1.4rem'}
              borderRadius={'30px'}
              border="1px solid white"
              _hover={{
                opacity: '0.8',
              }}
              _active={{
                opacity: '0.8',
              }}
              mb="8"
              onClick={handleLogOut}
            >
              <ChakraLink display="flex" align="center" color={'white'}>
                Sair
              </ChakraLink>
            </Button>
          </Flex>
        )}
      </MotionFlex>
    </MotionFlex>
  );
};
