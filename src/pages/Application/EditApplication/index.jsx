import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { Card } from '../../../components/Card';
import { api } from '../../../services/api/api';

export const EditApplication = ({
  onClose,
  productsIds,
  talhaoIds,
  itemn,
  handleGetApplications,
}) => {
  const [editApplication, setEditApplication] = useState(itemn);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChangeValue = e => {
    setEditApplication({ ...editApplication, [e.target.name]: e.target.value });
  };

  const handleEdit = async () => {
    setLoading(true);

    if (
      !editApplication.productId ||
      !editApplication.talhaoId ||
      !editApplication.applicationDate ||
      !editApplication.qntd
    ) {
      setLoading(false);
      return toast({
        title: `Preencha todos os dados!`,
        status: 'warning',
        isClosable: true,
      });
    }
    try {
      await api.patch('/application', editApplication);

      toast({
        title: `Aplicação editada com sucesso!`,
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: `Ocorreu um erro ao editar a aplicação!`,
        status: 'error',
        isClosable: true,
      });
    }
    onClose();
    handleGetApplications();
    setLoading(false);
  };

  return (
    <>
      <Card p="5">
        <Flex flexDir={'column'}>
          <Text fontWeight={'bold'} fontSize="1.5rem" mb="3">
            Fazer aplicação
          </Text>

          <Stack spacing={3}>
            <Flex flexDir={'column'}>
              <Flex
                w="100%"
                gridGap="10px"
                key={editApplication.fakeId ?? editApplication.id}
                flexDir="column"
              >
                <Flex flexDir={'column'}>
                  <Text>Produto: </Text>

                  <Select
                    placeholder={'Selecione uma opção'}
                    bg="#F1F1F1"
                    name="productId"
                    onChange={handleChangeValue}
                    // onChange={e => {
                    //   if (e?.target?.value === '') {
                    //     handleChangeProductsValue(e, editApplication.fakeId, '');

                    //     return;
                    //   }
                    //   const object = JSON.parse(e?.target?.value);

                    //   handleChangeProductsValue(e, editApplication.fakeId, object.id);
                    //   handleChangeQntdProduct(editApplication.fakeId, object.qntd);
                    // }}
                  >
                    {productsIds?.map((item, key) => (
                      <option
                        selected={item?.id === editApplication.productId}
                        value={JSON.stringify(item)}
                        key={key}
                      >
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </Flex>
                <Flex flexDir={'column'}>
                  <Text>Talhão: </Text>

                  <Select
                    placeholder={'Selecione uma opção'}
                    bg="#F1F1F1"
                    onChange={handleChangeValue}
                    // onChange={e => {
                    //   if (e?.target?.value === '') {
                    //     handleChangeProductsValue(e, editApplication.fakeId, '');
                    //     return;
                    //   }
                    //   const object = JSON.parse(e?.target?.value);

                    //   handleChangeProductsValue(e, editApplication.fakeId, object.id);
                    // }}
                    name="talhaoId"
                  >
                    {talhaoIds?.map((item, key) => (
                      <option
                        selected={item?.id === editApplication.talhaoId}
                        value={JSON.stringify(item)}
                        key={key}
                      >
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </Flex>

                <Flex flexDir={'column'}>
                  <Text>Data: </Text>
                  <InputGroup
                    bg="#F1F1F1"
                    borderRadius={'8px'}
                    alignItems={'center'}
                    justifyContent="center"
                  >
                    <Input
                      fontSize={'1rem'}
                      color="black"
                      placeholder="Digite a quantidade"
                      type={'date'}
                      autoComplete="off"
                      name="applicationDate"
                      value={editApplication.applicationDate.split('T')[0]}
                      onChange={handleChangeValue}
                      _placeholder={{
                        opacity: 0.5,
                        color: 'gray.400',
                        fontWeight: 'bold',
                      }}
                    />
                  </InputGroup>
                </Flex>

                <Flex flexDir={'column'}>
                  <Text>
                    Quantidade:{' '}
                    {editApplication.product.qntd &&
                      `(disponivel ${editApplication.product.qntd})`}
                  </Text>
                  <InputGroup
                    bg="#F1F1F1"
                    borderRadius={'8px'}
                    alignItems={'center'}
                    justifyContent="center"
                  >
                    <Input
                      fontSize={'1rem'}
                      color="black"
                      placeholder="Digite a quantidade"
                      type={'number'}
                      autoComplete="off"
                      name="qntd"
                      value={editApplication.qntd}
                      onChange={handleChangeValue}
                      _placeholder={{
                        opacity: 0.5,
                        color: 'gray.400',
                        fontWeight: 'bold',
                      }}
                    />
                  </InputGroup>
                </Flex>

                {editApplication.isDeletable && (
                  <Flex mt="5">
                    <Icon
                      as={BsTrash}
                      // onClick={() => handleDeleteProduct(editApplication.fakeId)}
                      color="black"
                      w="6"
                      h="6"
                      cursor={'pointer'}
                    />
                  </Flex>
                )}
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
              onClick={handleEdit}
              isLoading={loading}
            >
              Confirmar
            </Button>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};
