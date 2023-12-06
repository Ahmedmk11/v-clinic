import { List, Avatar, Button, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import NewChat from './NewChat'
import { useState, useContext, useEffect } from 'react'
import CurrUserContext from '../../../contexts/CurrUser'
const Contacts = ({ contacts, selectChat, selectedChat, createNewChat }) => {
    const [open, setOpen] = useState(false)
    const { role } = useContext(CurrUserContext)
    return (
        <div>
            <div className='contacts-header'>
                <h2>{role == 'doctor' ? 'Patients' : 'Doctors'}</h2>
                <Tooltip title='New Chat'>
                    <Button
                        type='primary'
                        shape='circle'
                        icon={<PlusOutlined />}
                        size='small'
                        onClick={() => setOpen(true)}
                    />
                </Tooltip>
            </div>
            <div className='contacts-sidebar'>
                <List 
                    dataSource={contacts}
                    renderItem={(contact) => (
                        <List.Item
                            style={{ padding: '0' }}
                            onClick={() => selectChat(contact)}
                            className={` Contact-title ${
                                contact?.id == selectedChat?.id ? 'active' : ''
                            }`}>
                            <div className='meta'>
                                <Avatar size={'small'}>
                                    {contact.name.charAt(0)}
                                </Avatar>
                                <p>
                                    {role == 'doctor' ? '' : 'Dr.'}{' '}
                                    {contact.name}
                                </p>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
            <NewChat
                chats={contacts}
                open={open}
                onCancel={() => setOpen(false)}
                onContactSelect={createNewChat}
            />
        </div>
    )
}

export default Contacts
