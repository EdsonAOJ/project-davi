import { ArrowForwardIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  itemAnimation,
  MotionFlex,
} from '../../components/Animation/AnimationFlex';
import { api } from '../../services/api/api';
import history from '../../services/history';
import { CardProperties } from './CardPropreties';

export const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [propertiesFiltered, setPropertiesFiltered] = useState([]);
  const [searchIcon, setSearchIcon] = useState(true);
  const inputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const handleChangeFilter = useCallback(() => {
    if (inputRef?.current?.value === '') {
      setPropertiesFiltered(properties ?? []);
      setSearchIcon(true);
      return;
    }

    // eslint-disable-next-line array-callback-return
    const result = properties?.filter(item => {
      if (
        item.name
          .toLowerCase()
          ?.includes(inputRef?.current?.value.toLowerCase() ?? '')
      ) {
        return item;
      }
    });

    setSearchIcon(false);
    setPropertiesFiltered(result);
  }, [properties]);

  const handleRemoveFIlters = () => {
    setPropertiesFiltered(properties);
    setSearchIcon(true);
    if (inputRef?.current?.value) {
      inputRef.current.value = '';
    }
  };

  const handleGetProperties = async () => {
    try {
      const response = await api.get('/properties');
      setProperties(response.data.result);
      setPropertiesFiltered(response.data.result);
    } catch (err) {}
  };

  useEffect(() => {
    handleGetProperties();
  }, []);

  return (
    <MotionFlex
      variants={itemAnimation}
      flexDir={'column'}
      initial="hidden"
      animate="visible"
      w="100%"
      h="100%"
    >
      <Flex align={'center'} justify="space-between" mb="10" pos={'relative'}>
        <Flex w="70%" justify={'space-between'} gap="10px">
          <InputGroup w="65%">
            <Input
              placeholder="Pesquise uma propriedade"
              borderColor={'#11FFB8'}
              focusBorderColor={'#11FFB8'}
              ref={inputRef}
              pr="75px"
            />
            {!searchIcon && (
              <CloseIcon
                color="gray.500"
                onClick={handleRemoveFIlters}
                pos="absolute"
                right={50}
                top={3}
                cursor="pointer"
              />
            )}

            <InputRightElement
              children={
                <SearchIcon color="gray.500" onClick={handleChangeFilter} />
              }
              cursor="pointer"
            />
          </InputGroup>
        </Flex>

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
          onClick={() => history.push('/properties/management/1')}
        >
          Adicionar propriedade
        </Button>
      </Flex>

      <Flex
        flexWrap={'wrap'}
        gridGap="7"
        maxH="calc(100vh - 150px)"
        overflow={'auto'}
        justifyContent={['left']}
        paddingRight={'5'}
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#11FFB8',
            borderRadius: '24px',
          },
        }}
      >
        {propertiesFiltered.map(item => (
          <CardProperties name={item.name} id={item.id} key={item.id} />
        ))}
      </Flex>
    </MotionFlex>
  );
};
