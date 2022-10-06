
import { Button, Input, Text, useToast, InputLeftAddon, InputGroup, Img } from '@chakra-ui/react';


import { useContext, useState } from 'react';

import { Context } from '../../Context/authContext'
import { MotionFlex, containerFlex } from '../../components/Animation/AnimationFlex';

import emailIcon from '../../shared/assets/images/emailIcon.svg'

import passwordIcon from '../../shared/assets/images/passwordIcon.svg'


export const Login = () => {
  const { handleLogin, loadingButton } = useContext(Context)

  const toast = useToast()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const handleChangeLogin = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }



  const handleLogar = async () => {

    try {

      if (!user.email.trim()) {
        return toast({
          title: `Digite o E-mail!`,
          status: 'error',
          isClosable: true,
        })
      }

      if (!user.password.trim()) {
        return toast({
          title: `Digite sua senha`,
          status: 'error',
          isClosable: true,
        })
      }


      const response = await handleLogin(user)



      if (response === '' || response === undefined || response === false) {
        return toast({
          title: `Email ou senha incorretos`,
          status: 'error',
          isClosable: true,
        })
      }

    } catch (err) {
      return toast({
        title: `Email ou senha incorretos`,
        status: 'error',
        isClosable: true,
      })
    }


  }

  return (


    <MotionFlex
      h='70%'
      variants={containerFlex}
      flexDir='column'
      align='center'
      justify='space-between'
      w='70%'

    >

      <Text
        fontSize={'2.5rem'}
        color='#11FFB8'
        fontWeight={'900'}
        fontFamily='Poppins'
      >
        Login
      </Text>

      <InputGroup bg='#F1F1F1' h='5rem' alignItems={'center'} justifyContent='center'>
        <InputLeftAddon children={<Img src={emailIcon} h='30px' w='30px' />} />
        <Input
          h='5rem'
          fontSize={'1.5rem'}
          type='text'
          color='black'
          _placeholder={{ opacity: 1, color: 'gray.400', fontWeight: 'bold' }}
          placeholder='EMAIL' autoComplete='off'
          name='email'
          value={user.email}
          onChange={handleChangeLogin}
        />
      </InputGroup>


      <InputGroup bg='#F1F1F1' h='5rem' alignItems={'center'} justifyContent='center'>
        <InputLeftAddon children={<Img src={passwordIcon} h='30px' w='30px' />} />
        <Input
          h='5rem'
          fontSize={'1.5rem'}
          color='black'
          placeholder='SENHA'
          type={'password'}
          autoComplete='off'
          name='password'
          value={user.password}
          onChange={handleChangeLogin}
          _placeholder={{ opacity: 1, color: 'gray.400', fontWeight: 'bold' }}
        />
      </InputGroup>


      <Button
        bg='#11FFB8'
        p='3rem'
        w='20rem'
        fontSize={'2rem'}
        borderRadius={'30px'}
        _hover={{
          opacity: '0.5'
        }}
        _active={{
          opacity: '0.8'
        }}
        isLoading={loadingButton}
        onClick={handleLogar}
      >Entrar</Button>
    </MotionFlex>


  );
};
