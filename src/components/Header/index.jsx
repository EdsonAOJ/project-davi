import { IconButton, Icon, useBreakpointValue } from '@chakra-ui/react'

import { RiMenuLine } from 'react-icons/ri'

import { useSidebar } from '../../Context/sidebar'

export const Header = () => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  const { onOpen } = useSidebar()

  return !isWideVersion && (
    <IconButton
      icon={<Icon as={RiMenuLine} />}
      variant='unstyled'
      fontSize='24'
      onClick={onOpen}
      bg='#63EDC3'
      aria-label="open navigation"
      mr='2'
    >
    </IconButton>

  )

}
