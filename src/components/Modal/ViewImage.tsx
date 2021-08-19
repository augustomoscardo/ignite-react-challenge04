import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK - OK
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay />
        <ModalContent 
          mx="auto" 
          width="auto" 
          height="auto" 
          maxWidth={["320px", "540px", "900px"]} 
          maxHeight={["350px", "450px", "600px"]}
        >
          <ModalBody padding="0">
            <Image 
              src={imgUrl} 
              maxWidth={["320px", "540px", "900px"]} 
              maxHeight={["350px", "450px", "600px"]} 
            />
          </ModalBody>

          <ModalFooter bg="pGray.800" paddingY="20px" height="2rem" borderBottomRadius="5px">
            <Link href={imgUrl} isExternal mr="auto" fontSize="1rem">
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
