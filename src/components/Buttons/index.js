import { Button, Text } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/color-mode';


export const BaseButton = ({ firstLabel, secondLabel, ...rest }) => {
  const formBackground = useColorModeValue('gray.500', 'gray.600');
  const hoverBackGround = useColorModeValue('gray.600', 'gray.700');

  return (
    <Button
      background={formBackground}
      fontSize="1rem"
      _hover={{ background: hoverBackGround }}
      cursor="pointer"
      borderRadius="1.5rem"
      {...rest}

    >
      <Text color='white'>  {firstLabel} <br /> {secondLabel}</Text>
    </Button>
  )
}
