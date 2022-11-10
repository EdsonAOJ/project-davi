import { Button, Flex, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { api } from '../../../services/api/api';
import history from '../../../services/history';

export const Buttons = ({ fullProperties }) => {
  const { id } = useParams();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleCreateOrUpdateAProvider = useCallback(async () => {
    setLoading(true);
    try {
      if (id !== '1') {
        await api.patch(`/properties/`, fullProperties);
        history.push('/properties');
        setLoading(false);
        return toast({
          title: `Fornecedor atualizado com sucesso!`,
          status: 'success',
          isClosable: true,
        });
      }
      await api.post(`/properties/`, fullProperties);
      history.push('/properties/');
      setLoading(false);
      return toast({
        title: `Propriedade criada com sucesso!`,
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      setLoading(false);
      return toast({
        title: `Erro ao criar uma propriedade!`,
        status: 'error',
        isClosable: true,
      });
    }
  }, [fullProperties, id, toast]);

  const handleDeleteProperties = useCallback(async () => {
    setLoading(true);
    try {
      await api.delete(`/properties/${fullProperties.id}`);
      history.push('/properties');
      setLoading(false);
      return toast({
        title: `Propriedade deletado com sucesso!`,
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      setLoading(false);
      return toast({
        title: `Erro ao deletar propriedade!`,
        status: 'error',
        isClosable: true,
      });
    }
  }, [fullProperties.id, toast]);

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
          onClick={() => history.push('/properties')}
        >
          Cancelar
        </Button>

        {id !== '1' && (
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
            onClick={handleDeleteProperties}
            isLoading={loading}
          >
            Deletar Propriedade
          </Button>
        )}

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
          {id !== '1' ? ' Atualizar' : 'Confirmar'}
        </Button>
      </Flex>
    </>
  );
};
