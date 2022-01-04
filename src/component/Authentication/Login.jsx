import { VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import React,{ useState } from 'react';
import axios from 'axios';

export default function Login() {

    const [show, setShow] = useState(false);
    const [email, SetEmail] = useState();
    const [password, SetPassword] = useState();
    const [loading, setLoading] = useState(false);

    const toast = useToast();



    const handleClick = () => setShow(!show);

    const submitHandler =async () => {
        setLoading(true);
        if(!email || !password ){
            toast({
                title:"please select all fields!",
                status:"warning",
                duration: 3000,
                isClosable:true,
                position: "bottom",
            });
            setLoading(false);
            return;
    };
    
    try {
        setLoading(true);
        const config = {
            headers:{
                "Content-type" : "application/json",
            },
        };
        const{ data } = await axios.post("https://chatting-backend.herokuapp.com/api/user/login",
        { email, password },
        config
        );

        toast({
            title:"login Successful",
            status:"success",
            duration: 3000,
            isClosable:true,
            position: "bottom",
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
        setLoading(false);
        window.location.href="/chats";
    } catch (error) {
        toast({
            title:"Error occured!",
            status:"warning",
            duration: 3000,
            isClosable:true,
            position: "bottom",
        });
        setLoading(false);
        
    }
};

    return (
        <VStack>
             <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input 
                    type={show ? "text" : "password"}
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => SetPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick} >
                            {show ? "Hide" : "show"}
                        </Button>
                    </InputRightElement>
                
                </InputGroup>
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                style={{marginTop:15}}
                onClick={submitHandler} 
                isLoading={loading}
            >
                Login
            </Button>
            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                style={{marginTop:15}}
                onClick={() => {
                    SetEmail("guest@example.com");
                    SetPassword("123456");
                }} 
            >
                Get Guest User Credentials
            </Button>
        </VStack>
    )
}
