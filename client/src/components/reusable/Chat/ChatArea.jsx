import { Card, Input, Button, Avatar, Spin } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import chatImage from '../../../assets/imgs/chat.png'
import { useEffect, useState, useRef, useContext } from 'react'
import CurrUserContext from '../../../contexts/CurrUser'
import axiosApi from '../../../utils/axiosApi'
import { io } from 'socket.io-client'
import { format } from 'timeago.js'
const { TextArea } = Input
const ChatArea = ({ selectedChat }) => {
    const [chatMessages, setChatMessages] = useState([])
    const [message, setMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [load, setLoad] = useState(false)
    const scrollRef = useRef()
    const socket = useRef()
    const { currUser } = useContext(CurrUserContext)

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatMessages])

    useEffect(() => {
        socket.current = io('ws://localhost:8900')
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage &&
            selectedChat?.members.includes(arrivalMessage.sender) &&
            setChatMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, selectedChat])

    useEffect(() => {
        if (!currUser) return
        socket.current.emit('addUser', currUser?._id)
        socket.current.on('getUsers', (users) => {
            console.log(users)
        })
    }, [currUser])

    useEffect(() => {
        if (!selectedChat) return
        setLoad(true)
        axiosApi
            .get('chat/get-messages/' + selectedChat?.id)
            .then((response) => {
                setChatMessages(response.data)
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
        setLoad(false)
    }, [selectedChat])

    const handleSendMessage = () => {
        if (!message || !currUser || !selectedChat) return
        const receiverId = selectedChat?.members?.find(
            (member) => member !== currUser?._id
        )

        socket.current.emit('sendMessage', {
            senderId: currUser?._id,
            receiverId,
            text: message,
        })

        axiosApi
            .post('chat/send-message', {
                conversationId: selectedChat?.id,
                sender: currUser?._id,
                text: message,
            })
            .then((response) => {
                console.log(response.data)
                setChatMessages([...chatMessages, response.data])
                setMessage('')
            })
            .catch((err) => {
                console.log(err.message)
                message.error('Failed to send message')
            })
    }

    return (
        <div className='chat-window'>
            {selectedChat && (
                <Card
                    title={
                        <span>
                            <Avatar size={'small'}>
                                {selectedChat.name.charAt(0)}
                            </Avatar>{' '}
                            {selectedChat.name}
                        </span>
                    }
                    className='chat-window'>
                    <div className='chat-messages'>
                        {chatMessages.map((msg, index) => (
                            <>
                                <p
                                    ref={scrollRef}
                                    key={index}
                                    className={`chat-message ${
                                        msg.sender == currUser?._id
                                            ? 'sender-message'
                                            : 'receiver-message'
                                    }`}>
                                    {msg.text}
                                </p>
                                <span
                                    className={`msg-time ${
                                        msg.sender == currUser?._id
                                            ? 'sender'
                                            : 'receiver'
                                    }`}>
                                    {format(msg.createdAt)}
                                </span>
                            </>
                        ))}
                    </div>
                    <div className='chat-area'>
                        <TextArea
                            placeholder={'Type a message...'}
                            autoSize={{ minRows: 1, maxRows: 4 }}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            // onPressEnter={handleSendMessage}
                        />
                        <Button
                            className='send-button'
                            onClick={handleSendMessage}
                            type='primary'>
                            <SendOutlined />
                        </Button>
                    </div>
                </Card>
            )}
            {!selectedChat && (
                <Card
                    title={
                       <span style={{whiteSpace:"pre-wrap"}}>Select a contact to start a conversation or create a new one</span>
                    }
                    className='chat-window'>
                    <div className='chat-messages'></div>

                    <div className='chat-area'>
                        <TextArea
                            disabled
                            placeholder={'Select a contact to start a chat'}
                            autoSize={{ minRows: 1, maxRows: 4 }}
                        />
                        <Button className='send-button' type='primary' disabled>
                            <SendOutlined />
                        </Button>
                    </div>
                </Card>
            )}
            {load && (
                <div className='no-contact-selected'>
                    <Spin />
                </div>
            )}
        </div>
    )
}
export default ChatArea
