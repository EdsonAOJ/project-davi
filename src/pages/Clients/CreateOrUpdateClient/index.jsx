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

export const CreateOrUpdateClient = ({
  onClose,
  client,
  clients,
  setClients,
  handleGetClients,
}) => {
  const [newCLient, setNewClient] = useState(client);
  const toast = useToast();

  const handleChangeClient = e => {
    if (e.target.name.includes('cnpj')) {
      newCLient.cnpj = e.target.value.slice(0, 14);
      setNewClient({ ...newCLient });
      return;
    }
    setNewClient({ ...newCLient, [e.target.name]: e.target.value });
  };

  const handleUpdateOrCreateClient = useCallback(async () => {
    if (client.id) {
      try {
        if (
          !newCLient.email &&
          !newCLient.name &&
          !newCLient.cpf &&
          !newCLient.insc_state
        ) {
          return toast({
            title: `preencha todos os dados!`,
            status: 'warning',
            isClosable: true,
          });
        }

        await api.patch(`/clients`, newCLient);

        handleGetClients();
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
        !newCLient.email &&
        !newCLient.name &&
        !newCLient.cpf &&
        !newCLient.insc_state
      ) {
        return toast({
          title: `preencha todos os dados!`,
          status: 'warning',
          isClosable: true,
        });
      }

      await api.post(`/clients`, newCLient);
      handleGetClients();
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
  }, [client.id, handleGetClients, newCLient, onClose, toast]);

  const handleDeleteClient = async () => {
    try {
      await api.delete(`/clients/${client.id}`);

      setClients(clients.filter(item => item.id !== client.id));
      onClose();
      return toast({
        title: `Cliente deletado criado com sucesso!`,
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      onClose();
      return toast({
        title: `Erro ao atualizar o cliente!`,
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <Card p="5">
      <Flex flexDir={'column'}>
        <Text fontWeight={'bold'} fontSize="1.5rem" mb="3">
          {client?.id ? 'Editar cliente' : 'Criar cliente'}
        </Text>

        <Stack spacing={3}>
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
                value={newCLient.name}
                onChange={handleChangeClient}
                _placeholder={{
                  opacity: 0.5,
                  color: 'gray.400',
                  fontWeight: 'bold',
                }}
              />
            </InputGroup>
          </Flex>

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
                value={newCLient.email}
                onChange={handleChangeClient}
                _placeholder={{
                  opacity: 0.5,
                  color: 'gray.400',
                  fontWeight: 'bold',
                }}
              />
            </InputGroup>
          </Flex>

          <Flex flexDir={'column'}>
            <Text>Inscrição atual: </Text>
            <InputGroup
              bg="#F1F1F1"
              borderRadius={'8px'}
              alignItems={'center'}
              justifyContent="center"
            >
              <Input
                fontSize={'1rem'}
                color="black"
                placeholder="Inscrição"
                type={'text'}
                autoComplete="off"
                name="insc_state"
                value={newCLient.insc_state}
                onChange={handleChangeClient}
                _placeholder={{
                  opacity: 0.5,
                  color: 'gray.400',
                  fontWeight: 'bold',
                }}
              />
            </InputGroup>
          </Flex>

          <Flex flexDir={'column'}>
            <Text>CNPJ: </Text>
            <InputGroup
              bg="#F1F1F1"
              borderRadius={'8px'}
              alignItems={'center'}
              justifyContent="center"
            >
              <Input
                fontSize={'1rem'}
                color="black"
                placeholder="Seu cnpj"
                type={'number'}
                autoComplete="off"
                name="cnpj"
                value={newCLient.cnpj}
                onChange={handleChangeClient}
                _placeholder={{
                  opacity: 0.5,
                  color: 'gray.400',
                  fontWeight: 'bold',
                }}
              />
            </InputGroup>
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

          {client.id && (
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
              onClick={handleDeleteClient}
            >
              Deletar
            </Button>
          )}

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
            onClick={handleUpdateOrCreateClient}
          >
            {client?.id ? 'Confirmar edição' : 'Criar'}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
