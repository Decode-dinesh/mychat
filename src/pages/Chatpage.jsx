import React, { useState } from 'react';
import { Box } from "@chakra-ui/layout";
import { ChatState } from "../context/ChatProvider";
import Chatbox from "../component/Chatbox.jsx";
import MyChats from "../component/MyChats.jsx";
import SideDrawer from "../component/miscellaneous/SideDrawer";

export default function Chatpage() {

    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    return (
          <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && (
                <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                )}
            </Box>
        </div> 
    )
}
