import { Stack, Link as ChakraLink, Text, Flex, Button } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import { Context } from '../../Context/authContext'
import { useContext } from "react"
import { headerFlexAnimation, MotionFlex, sidebarAnimation } from "../Animation/AnimationFlex"


export const SidebarNav = () => {
  const { handleLogOut } = useContext(Context)

  return (
    <MotionFlex
      flexDir='column'
      variants={headerFlexAnimation}
      initial='hidden'
      animate='visible'
      align='center'
      h='100%'
      w='100%'
    >
      <MotionFlex
        variants={sidebarAnimation}
        initial='hidden'
        animate='visible'
        h='100%'
        w='100%'
      >

        {window.location.pathname === '/' ? (
          <Flex w='100%' flexDir={'column'} align={'center'} justify='center'  >
            <Text
              fontWeight={'bold'}
              fontSize='2.2rem'
              fontStyle={'normal'}
              whiteSpace='nowrap'
              overflow={'hidden'}
            >
              Bem-Vindo de volta
            </Text>
            <Text fontSize='1.1rem' fontWeight='bold'>
              Acesse sua conta agora mesmo
            </Text>
          </Flex>
        ) : (
          <Flex w='100%' mt='3rem' flexDir={'column'} align={'center'} justify='space-between'   >
            <Stack spacing='4' mt='6' align='stretch'>
              <Link to='/usuarios'>
                <Button
                  bg='#11FFB8'
                  color='white'
                  p='2.3rem'
                  w='18rem'
                  fontSize={'1.8rem'}
                  borderRadius={'30px'}
                  border='1px solid white'
                  _hover={{
                    opacity: '0.8'
                  }}
                  _active={{
                    opacity: '0.8'
                  }}
                >
                  <ChakraLink
                    display='flex'
                    align='center'
                    color={window.location.pathname === '/usuarios' ? 'white' : 'white'}
                  >
                    USUÁRIOS
                  </ChakraLink>
                </Button>
              </Link>
            </Stack>


            <Button
              bg='#11FFB8'
              color='white'
              p='2.3rem'
              w='18rem'
              fontSize={'1.8rem'}
              borderRadius={'30px'}
              border='1px solid white'
              _hover={{
                opacity: '0.8'
              }}
              _active={{
                opacity: '0.8'
              }}
              mb='8'
              onClick={handleLogOut}
            >
              <ChakraLink
                display='flex'
                align='center'
                color={'white'}
              >
                Sair
              </ChakraLink>
            </Button>

          </Flex>


        )}



      </MotionFlex>

    </MotionFlex>
  )
}
