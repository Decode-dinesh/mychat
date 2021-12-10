import React,{ useEffect } from 'react';
import { Box, Container, Text,Tab, TabList, TabPanel,TabPanels,Tabs } from '@chakra-ui/react';
import Login from '../component/Authentication/Login';
import Signup from '../component/Authentication/Signup';
import { useHistory } from 'react-router-dom';

export default function Homepage() {

    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if(user) history.push('/chats');
    },[history])


    return (
        <Container maxW='xl' centerContent >
            <Box
                d="flex"
                justifyContent="center"
                p={3}
                bg={'white'}
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize='4xl' fontFamily="work sans" color="blue">My Chat</Text>
            </Box>
            <Box bg={'white'} w="100%" borderRadius="lg" color="black" borderWidth="1px" p={3} >
            <Tabs variant='soft-rounded'>
                <TabList mb="1em">
                    <Tab width="50%" >Login</Tab>
                    <Tab width="50%" >Sign up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login />
                    </TabPanel>
                    <TabPanel>
                        <Signup />
                    </TabPanel>
                </TabPanels>
                </Tabs>
            </Box>

        </Container>
       
    )
}
