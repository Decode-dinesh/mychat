import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

export default function Signup() {

    const [show, setShow] = useState(false);
    const [name, SetName] = useState();
    const [email, SetEmail] = useState();
    const [password, SetPassword] = useState();
    const [confirmpassword, Setconfirmpassword] = useState();
    const [pic, SetPic] = useState();
    const [loading, setLoading] = useState(false)
    const toast = useToast();
    const history = useHistory();

    const handleClick = () => setShow(!show);

    const postDetails = (pics) => {
        setLoading(true);
        if(pics === undefined){
            toast({
                title:"please select an Image!",
                status:"warning",
                duration: 5000,
                isClosable:true,
                position: "bottom",
            });
            return;
        }
        if(pics.type === "image/jpeg" || pics.type === "images/png"){
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset", "Chat-app");
            data.append("cloud_name","decode-dinesh");
            fetch("https://res.cloudinary.com/decode-dinesh/image/upload",{
                method: "post",
                body: data,
            }).then((res) => res.json())
            .then(data => {
                SetPic(data.url.toString());
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
        }else{
            toast({
                title:"please select an Image!",
                status:"warning",
                duration: 5000,
                isClosable:true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    };

    const submitHandler =async () => {
        setLoading(true);
        if(!name || !email || !password || !confirmpassword){
            toast({
                title:"please select all fields!",
                status:"warning",
                duration: 5000,
                isClosable:true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }if(password !== confirmpassword){
            toast({
                title:"password do not match!",
                status:"warning",
                duration: 5000,
                isClosable:true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers:{
                    "Content-type" : "application/json",
                },
            };
            const{ data } = await axios.post("https://chatting-backend.herokuapp.com/api/user",
            {name, email, password, pic},
            config
            );
            toast({
                title:"Registration Successful",
                status:"warning",
                duration: 5000,
                isClosable:true,
                position: "bottom",
            });

            localStorage.setItem('userInfo', JSON.stringify(data));

            setLoading(false);
            history.push('/chats')
        } catch (error) {
            toast({
                title:"Error occured!",
                status:"warning",
                duration: 5000,
                isClosable:true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    };

    return (
        <VStack spacing='5px'>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input 
                placeholder="Enter Your Name"
                onChange={(e) => SetName(e.target.value)}
                />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                placeholder="Enter Your Email"
                onChange={(e) => SetEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input 
                    type={show ? "text" : "password"}
                    placeholder="Enter Your Password"
                    onChange={(e) => SetPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick} >
                            {show ? "Hide" : "show"}
                        </Button>
                    </InputRightElement>
                
                </InputGroup>
            </FormControl>
            <FormControl id='confirmpassword' isRequired>
                <FormLabel>Confirm password</FormLabel>
                <InputGroup>
                    <Input 
                    type={show ? "text" : "password"}
                    placeholder="Re enter your password"
                    onChange={(e) => Setconfirmpassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick} >
                                {show ? "Hide" : "show"}
                            </Button>
                        </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input 
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.value[0])}
                />
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                style={{marginTop:15}}
                onClick={submitHandler} 
                isLoading={loading}
            >
                Sign Up
            </Button>
            
        </VStack>
    )
}
