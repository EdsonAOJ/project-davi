import { Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'


export const containerFlex = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  },
}

export const headerFlexAnimation = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 1
    }
  }
}



export const sidebarAnimation = {
  hidden: { y: -60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 1
    }
  }
}




export const itemAnimation = {
  hidden: { y: -60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export const MotionFlex = motion(Flex)
