import {
  Button,
  Flex,
  Input,
  InputGroup,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { Card } from '../../../components/Card';
import { api } from '../../../services/api/api';

export const CreateOrUpdateTalhao = ({
  onClose,
  talhao,
  talhoes,
  setTalhoes,
}) => {
  const [newTalhao, setNewTalhao] = useState(talhao);
  const [properties, setProperties] = useState([]);
  const toast = useToast();

  const handleChangeTalhao = e => {
    setNewTalhao({ ...newTalhao, [e.target.name]: e.target.value });
  };
  const handleGetTalhoes = useCallback(async () => {
    try {
      const response = await api.get('talhao');
      setTalhoes(response.data.result);
    } catch (err) {
      return toast({
        title: `Erro ao buscar os talhões!`,
        status: 'error',
        isClosable: true,
      });
    }
  }, [setTalhoes, toast]);

  const handleUpdateOrCreateTalhao = useCallback(async () => {
    if (talhao.id) {
      try {
        if (!newTalhao.name && !newTalhao.propertyId) {
          return toast({
            title: `preencha todos os dados!`,
            status: 'warning',
            isClosable: true,
          });
        }

        await api.patch(`/talhao`, newTalhao);

        let newTalhaos = talhoes.map(item => {
          if (item.id === newTalhao.id) {
            item = newTalhao;
          }
          return item;
        });

        setTalhoes(newTalhaos);
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
      if (!newTalhao.name && !newTalhao.propertyId) {
        return toast({
          title: `preencha todos os dados!`,
          status: 'warning',
          isClosable: true,
        });
      }

      await api.post(`/talhao`, newTalhao);
      handleGetTalhoes();
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
  }, [
    handleGetTalhoes,
    newTalhao,
    onClose,
    setTalhoes,
    talhao.id,
    talhoes,
    toast,
  ]);

  const handleDeleteTalhoes = async () => {
    try {
      await api.delete(`talhao/${talhao.id}`);

      setTalhoes(talhoes.filter(item => item.id !== talhao.id));
      onClose();
      return toast({
        title: `Talhão deletado com sucesso!`,
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      return toast({
        title: `Erro ao deletar o Talhão!`,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleGetProperties = async () => {
    try {
      const response = await api.get('properties');
      setProperties(response.data.result);
    } catch (err) {}
  };

  useEffect(() => {
    handleGetProperties();
  }, []);

  return (
    <Card p="5">
      <Flex flexDir={'column'}>
        <Text fontWeight={'bold'} fontSize="1.5rem" mb="3">
          {talhao.id ? 'Editar talhão' : 'Criar talhão'}
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
                placeholder="Nome"
                type={'text'}
                autoComplete="off"
                name="name"
                value={newTalhao.name}
                onChange={handleChangeTalhao}
                _placeholder={{
                  opacity: 0.5,
                  color: 'gray.400',
                  fontWeight: 'bold',
                }}
              />
            </InputGroup>
          </Flex>
          <Flex flexDir={'column'}>
            <Text>Propriedade: </Text>

            <Select
              placeholder={'Selecione uma opção'}
              bg="#F1F1F1"
              onChange={handleChangeTalhao}
              name="propertyId"
            >
              {properties?.map((item, key) => (
                <option
                  value={item.id}
                  key={key}
                  selected={talhao.propertyId === item.id}
                >
                  {item.name}
                </option>
              ))}
            </Select>
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
            onClick={handleDeleteTalhoes}
          >
            Deletar
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
            onClick={handleUpdateOrCreateTalhao}
          >
            {talhao.id ? 'Confirmar edição' : 'Criar'}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
