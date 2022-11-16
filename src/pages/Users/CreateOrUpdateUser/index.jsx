import {
  Button,
  Flex,
  Input,
  InputGroup,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { Card } from '../../../components/Card';
import { api } from '../../../services/api/api';

export const CreateOrUpdateUser = ({ onClose, user, handleGetUsers }) => {
  const [newUser, setNewUser] = useState(user);
  const toast = useToast();

  const handleChangeUser = e => {
    console.log(newUser);
    if ([e.target.name].includes('ddd')) {
      newUser.phones[0].ddd = e.target.value.slice(0, 2);
      setNewUser({ ...newUser });
      return;
    }

    if ([e.target.name].includes('number')) {
      newUser.phones[0].number = e.target.value.slice(0, 11);
      setNewUser({ ...newUser });
      return;
    }

    if (e.target.name.toLowerCase() === 'name') {
      newUser.name = e.target.value.slice(0, 100);
      setNewUser({ ...newUser });
      return;
    }

    if (e.target.name.toLowerCase() === 'cpf') {
      newUser.cpf = e.target.value.slice(0, 11);
      setNewUser({ ...newUser });
      return;
    }

    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleUpdateOrCreateUser = useCallback(async () => {
    if (user.id) {
      try {
        if (
          !newUser.email &&
          !newUser.name &&
          !newUser.cpf &&
          newUser.phones[0].ddd.trim() === '' &&
          newUser.phones[0].number.trim() === ''
        ) {
          return toast({
            title: `preencha todos os dados!`,
            status: 'warning',
            isClosable: true,
          });
        }

        await api.patch(`/user`, newUser);

        handleGetUsers();
        onClose();
        return toast({
          title: `Usuário atualizado com sucesso!`,
          status: 'success',
          isClosable: true,
        });
      } catch (err) {
        onClose();
        return toast({
          title: `Erro ao atualizar o usuário!`,
          status: 'error',
          isClosable: true,
        });
      }
    }

    try {
      if (
        !newUser.email &&
        !newUser.name &&
        !newUser.passowrd &&
        !newUser.cpf &&
        newUser.phones[0].ddd.trim() === '' &&
        newUser.phones[0].number.trim() === ''
      ) {
        return toast({
          title: `preencha todos os dados!`,
          status: 'warning',
          isClosable: true,
        });
      }

      await api.post(`/user`, newUser);
      handleGetUsers();
      onClose();
      return toast({
        title: `Usuário criado com sucesso!`,
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      onClose();
      return toast({
        title: `Erro ao atualizar o usuário!`,
        status: 'error',
        isClosable: true,
      });
    }
  }, [handleGetUsers, newUser, onClose, toast, user.id]);

  return (
    <Card p="5">
      <Flex flexDir={'column'}>
        <Text fontWeight={'bold'} fontSize="1.5rem" mb="3">
          {user.id ? 'Editar usuário' : 'Criar usuário'}
        </Text>

        <Stack spacing={3}>
          <Flex flexDir={'column'}>
            <Text>Email: </Text>
            <InputGroup
              bg="#F1F1F1"
              borderRadius={'8px'}
              alignItems={'center'}
              justifyContent="center"
            >
              <Input
                fontSize={'1rem'}
                color="black"
                placeholder="Seu email"
                type={'text'}
                autoComplete="off"
                name="email"
                value={newUser.email}
                onChange={handleChangeUser}
                _placeholder={{
                  opacity: 0.5,
                  color: 'gray.400',
                  fontWeight: 'bold',
                }}
              />
            </InputGroup>
          </Flex>

          {!user.password && (
            <Flex flexDir={'column'}>
              <Text>Senha: </Text>
              <InputGroup
                bg="#F1F1F1"
                borderRadius={'8px'}
                alignItems={'center'}
                justifyContent="center"
              >
                <Input
                  fontSize={'1rem'}
                  color="black"
                  placeholder="*******"
                  type={'text'}
                  autoComplete="off"
                  name="password"
                  value={newUser.password}
                  onChange={handleChangeUser}
                  _placeholder={{
                    opacity: 0.5,
                    color: 'gray.400',
                    fontWeight: 'bold',
                  }}
                />
              </InputGroup>
            </Flex>
          )}
          <Flex flexDir={'column'}>
            <Text>Nome: </Text>
            <InputGroup
              bg="#F1F1F1"
              borderRadius={'8px'}
              alignItems={'center'}
              justifyContent="center"
            >
              <Input
                fontSize={'1rem'}
                color="black"
                placeholder="Seu nome"
                type={'text'}
                autoComplete="off"
                name="name"
                maxLength={'100'}
                value={newUser.name}
                onChange={handleChangeUser}
                _placeholder={{
                  opacity: 0.5,
                  color: 'gray.400',
                  fontWeight: 'bold',
                }}
              />
            </InputGroup>
          </Flex>

          <Flex flexDir={'column'}>
            <Text>CPF: </Text>
            <InputGroup
              bg="#F1F1F1"
              borderRadius={'8px'}
              alignItems={'center'}
              justifyContent="center"
            >
              <Input
                fontSize={'1rem'}
                color="black"
                placeholder="Seu cpf"
                type={'number'}
                autoComplete="off"
                name="cpf"
                maxLength={11}
                max={11}
                value={newUser.cpf}
                onChange={handleChangeUser}
                _placeholder={{
                  opacity: 0.5,
                  color: 'gray.400',
                  fontWeight: 'bold',
                }}
              />
            </InputGroup>
          </Flex>

          <Flex flexDir={'column'}>
            <Flex flexDir={'column'}>
              <Text>Telefone: </Text>

              <Flex gridGap="1rem">
                <Input
                  fontSize={'1rem'}
                  color="black"
                  placeholder="11"
                  type={'number'}
                  autoComplete="off"
                  maxW="75px"
                  bg="#F1F1F1"
                  name="ddd"
                  maxLength={2}
                  value={newUser?.phones[0]?.ddd}
                  onChange={handleChangeUser}
                  _placeholder={{
                    opacity: 0.5,
                    color: 'gray.400',
                    fontWeight: 'bold',
                  }}
                />

                <Input
                  fontSize={'1rem'}
                  color="black"
                  placeholder="12345-5678"
                  type={'number'}
                  autoComplete="off"
                  bg="#F1F1F1"
                  name="number"
                  maxLength={9}
                  value={newUser?.phones[0]?.number}
                  onChange={handleChangeUser}
                  _placeholder={{
                    opacity: 0.5,
                    color: 'gray.400',
                    fontWeight: 'bold',
                  }}
                />
              </Flex>
            </Flex>
          </Flex>
        </Stack>

        <Flex w="100%" justify={'space-between'} mt="6">
          <Button
            bg="#11FFB8"
            p="1rem"
            fontSize={'1rem'}
            borderRadius={'8px'}
            _hover={{
              opacity: '0.5',
            }}
            _active={{
              opacity: '0.8',
            }}
            onClick={onClose}
          >
            Fechar
          </Button>
          <Button
            bg="#11FFB8"
            p="1rem"
            fontSize={'1rem'}
            borderRadius={'8px'}
            _hover={{
              opacity: '0.5',
            }}
            _active={{
              opacity: '0.8',
            }}
            onClick={handleUpdateOrCreateUser}
          >
            {user.id ? 'Confirmar edição' : 'Criar'}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
