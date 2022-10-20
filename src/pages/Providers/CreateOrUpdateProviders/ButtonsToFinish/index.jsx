import { Button, Flex, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { api } from '../../../../services/api/api';
import history from '../../../../services/history';

export const ButtonsToFinish = ({ fullProvider }) => {
  const { id } = useParams();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleCreateOrUpdateAProvider = useCallback(async () => {
    setLoading(true);
    try {
      if (id !== '1') {
        await api.patch(`/provider/`, fullProvider);
        history.push('/providers');
        setLoading(false);
        return toast({
          title: `Fornecedor atualizado com sucesso!`,
          status: 'success',
          isClosable: true,
        });
      }
      await api.post(`/provider/`, fullProvider);
      history.push('/providers/');
      setLoading(false);
      return toast({
        title: `Fornecedor criado com sucesso!`,
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      setLoading(false);
      return toast({
        title: `Erro ao buscar os dados dos fornecedores!`,
        status: 'error',
        isClosable: true,
      });
    }
  }, [fullProvider, id, toast]);

  return (
    <>
      <Flex mt="5" justify={'space-between'} align="center">
        <Button
          bg="#11FFB8"
          fontSize={'1rem'}
          borderRadius={'10px'}
          _hover={{
            opacity: '0.5',
          }}
          _active={{
            opacity: '0.8',
          }}
          onClick={() => history.push('/providers')}
        >
          Voltar
        </Button>
        <Button
          bg="#11FFB8"
          fontSize={'1rem'}
          borderRadius={'10px'}
          _hover={{
            opacity: '0.5',
          }}
          _active={{
            opacity: '0.8',
          }}
          onClick={handleCreateOrUpdateAProvider}
          isLoading={loading}
        >
          {id !== '1' ? ' Atualizar' : 'Criar'}
        </Button>
      </Flex>
    </>
  );
};
