import React, {useState} from "react";
import { Box, Flex, Text, Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react' 
import axios from "axios";

// drag and drop stuff
import Container from "./Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useStore,cardStore } from "../../store";

const SideMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSubmitted, setIsSubmitted] = useState(false);

  const Rank = useStore((state) => state.Rank);
  const gloCard = cardStore((state) => state.card);

  const handleSubmit = () => {
    // post the data to the database
    console.log("submit");


    gloCard.map(
      (card) => {
        console.log("submit");
        const pro_rej = {
          studentid: JSON.parse(sessionStorage.getItem("user")).studentid, 
          project_id: card.id,
          project_ranking: gloCard.indexOf(card) + 1,
          state: "initial",
          approve: false}
        sessionStorage.setItem('pro_rej', JSON.stringify(pro_rej))
        location.replace ("http://localhost/add_project_register.php?data=" + sessionStorage.getItem('pro_rej')) 
        }

    )
      setIsSubmitted(true);
  };

 

  return (
    <Flex
      w="400px"
      height="95vh"
      pb={7}
      bg="BG"
      color="DarkShades"
      flexDirection="column"
      borderRight="1px solid #E2E8F0"
      justifyContent="space-between"
    >
      <Flex flexDir="column">
        <Box p="1rem" bg="DarkShades" textAlign="center" width="100%">
          <Text fontSize="1rem" fontWeight="bold" color="LightShades">
            My selections {Rank.length}/3
          </Text>
        </Box>
        <Box p="1rem">
          <Text>Please select up to 3 projects</Text>
          <Text>Drag to rank</Text>

          <DndProvider backend={HTML5Backend}>
            <Container />
          </DndProvider>
        </Box>
      </Flex>

        <Button 
          className="submit-btn"
          mx="1rem"
          bg="AccentMain.default"
          colorScheme="purple"
          onClick={onOpen}
          disabled={Rank.length < 3 && isSubmitted === false}
          
        >
          Submit
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={24}>Submit your project selection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" gap={2} mt={6}>
            { gloCard.map((item) => (

              <Box key={item.id}  borderRadius={5} py={4} px={2} bg="gray.100" color="DarkShades">
                <Flex flexDir="row" alignItems="center" gap={3}>
                  <Flex bg="DarkShades" minW="2rem"minH="2rem" borderRadius="100" justifyContent="center" alignItems="center" textAlign="center">
                  <Text color="LightShades" fontWeight="bold">{gloCard.indexOf(item) + 1}</Text>

                  </Flex>
                  <Flex flexDir="column" gap={4}>

                    <Text fontWeight="bold" lineHeight="20px">{item.topic}</Text>

                    <Flex flexDir="row" gap={20}>
                      <Text fontWeight="bold" lineHeight="20px">{item.lecturer.name}</Text>
                      <Text lineHeight="20px">{item.lecturer2.name}</Text>
                    </Flex>
                  </Flex>
                  

                </Flex>
              </Box>
              )
            )}
            </Flex>
            <Flex gap={1} flexDir="column" mt={10}>
              {window &&  <Text>Submit as: <b >{JSON.parse(sessionStorage.getItem("user")).name}</b></Text>}
              {window &&  <Text>Email: <b>{JSON.parse(sessionStorage.getItem("user")).email}</b></Text>}
            </Flex>

            <Flex flexDir="column" gap={2} mt={8}>
              <Text>
              Your supervisor will be informed of your application. 
              </Text>
              <Text>
              Once your application is approved, you will receive an email notification. Please pay attemtion to your mailbox. 

              </Text>
              
            </Flex>
            

          </ModalBody>

          <ModalFooter mt={8}>
            <Button mr={3} onClick={handleSubmit} colorScheme="purple">
              Confirm and Submit
            </Button>
            <Button variant='ghost' onClick={onClose} >Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Flex>
  );
};

export default SideMenu;
