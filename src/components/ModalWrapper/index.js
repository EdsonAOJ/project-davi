import { Modal, ModalOverlay } from "@chakra-ui/modal"


export const ModalWrapper = ({ children, ...rest }) => {

  return (
    <>
      <Modal {...rest} isCentered >
        <ModalOverlay>{children}</ModalOverlay>
      </Modal>
    </>
  )
}
