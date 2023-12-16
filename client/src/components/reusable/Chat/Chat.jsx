import { useContext, useEffect, useState } from 'react'
import axiosApi from '../../../utils/axiosApi'
import CurrUserContext from '../../../contexts/CurrUser'
import Contacts from './Contacts'
import ChatArea from './ChatArea'
import './chat.css'

const Chat = () => {
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState(null)
    const { currUser } = useContext(CurrUserContext)

    useEffect(() => {
        if (!currUser) return
        axiosApi.get('chat/get-chats/' + currUser?._id).then((response) => {
            setChats(() =>
                response.data?.map((chat) => {
                    let name = chat.membersInfo[0]
                    if (name == currUser.name) name = chat.membersInfo[1]
                    let senderId = chat.members[0]
                    if (senderId == currUser?._id) senderId = chat.members[1]
                    return {
                        senderId,
                        name,
                        id: chat._id,
                        members: chat.members,
                    }
                })
            )
        })
    }, [currUser])

    const createNewChat = (contact) => {
        axiosApi
            .post('chat/create-chat', {
                sender: currUser?._id,
                receiver: contact._id,
                senderName: currUser?.name,
                receiverName: contact.name,
            })
            .then((response) => {
                let chat = response.data.chat
                let name = chat.membersInfo[0]
                if (name == currUser.name) name = chat.membersInfo[1]
                let senderId = chat.members[0]
                if (senderId == currUser?._id) senderId = chat.members[1]
                setSelectedChat({
                    senderId,
                    name,
                    id: chat._id,
                    members: chat.members,
                })
                setChats([
                    ...chats,
                    { senderId, name, id: chat._id, members: chat.members },
                ])
            })
            .catch((err) => console.log(err.message))
    }

    const handleContactSelect = (contact) => {
        setSelectedChat(contact)
    }

    return (
        <div className='page'>
            <div className='chat-container'>
                <Contacts
                    contacts={chats}
                    selectChat={handleContactSelect}
                    selectedChat={selectedChat}
                    createNewChat={createNewChat}
                />
                <ChatArea selectedChat={selectedChat} />
            </div>
        </div>
    )
}

export default Chat
