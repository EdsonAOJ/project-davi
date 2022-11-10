import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, Img, Text } from '@chakra-ui/react';
import history from '../../../services/history';

export const CardProperties = ({ name, id }) => {
  const imgs = [
    'https://cdn.gazetasp.com.br/img/pc/920/610/dn_arquivo/jpg/2021/07/15/vista_aerea__jd_prudencia_e_vila_mascote_cred_thiago_neme__129_-777846.jpg',
    'https://www.cimentoitambe.com.br/wp-content/uploads/2018/08/Abraj-Al-Bait.jpg',
    'https://www.cimentoitambe.com.br/wp-content/uploads/2018/08/Marina-Bay-Sands.jpg',
    'https://www.cimentoitambe.com.br/wp-content/uploads/2018/08/Resorts-World-Sentosa.jpg',
    'https://www.cimentoitambe.com.br/wp-content/uploads/2018/08/Emirates-Palace.jpg',
    'https://www.cimentoitambe.com.br/wp-content/uploads/2018/08/Cosmopolitan-of-Las-Vegas.jpg',
    'https://www.cimentoitambe.com.br/wp-content/uploads/2018/08/One-World-Trade-Center.jpg',
    'https://www.cimentoitambe.com.br/wp-content/uploads/2018/08/Wynn-Resort.jpg',
    'https://www.cimentoitambe.com.br/wp-content/uploads/2018/08/Venetian-Macau.jpg',
    'https://www.cimentoitambe.com.br/wp-content/uploads/2018/08/City-of-Dreams.jpg',
    'https://www.cimentoitambe.com.br/wp-content/uploads/2018/08/Princess-Tower.jpg',
  ];
  return (
    <Flex
      h="250px"
      w="250px"
      borderRadius="8px"
      bg="#14E8A8"
      flexDir={'column'}
      onClick={() => history.push(`/properties/management/${id}`)}
    >
      <Img
        src={imgs[Math.floor(Math.random() * 11)]}
        objectFit={'cover'}
        h="50%"
        minH="130px"
        w="100%"
        borderRadius="8px 8px 0px 0px"
      />
      <Flex w="100%" bg="#11FFB8" p="2px" />

      <Flex p="2" flexDir={'column'} justify="space-between" h="100%" w="100%">
        <Text color="white" fontWeight={'bold'}>
          {' '}
          {name}
        </Text>
        <Flex flexDir={'column'} mt="3">
          <Flex w="100%" bg="#11FFB8" p="1px" />
          <Text
            fontWeight={'bold'}
            textAlign="center"
            color="green.100"
            cursor={'pointer'}
            _hover={{
              color: 'white',
            }}
            transition={'ease-in-out 0.2s'}
          >
            Editar propriedade
            <ArrowForwardIcon />
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
