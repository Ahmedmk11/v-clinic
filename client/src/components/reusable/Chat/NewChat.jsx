import React, { useState, useEffect, useContext } from 'react'
import { Modal, Input, Card } from 'antd'
import axiosApi from '../../../utils/axiosApi'
import CurrUserContext from '../../../contexts/CurrUser'

const NewChat = ({ open, onCancel, onContactSelect,chats }) => {
    const [searchValue, setSearchValue] = useState('')
    const [contacts, setContacts] = useState([])
    const { currUser, role } = useContext(CurrUserContext)

    useEffect(() => {
        if (!currUser) return
        switch (role) {
            case 'patient':
                axiosApi
                    .get('chat/get-patient-contacts/' + currUser?._id)
                    .then((response) => {
                        setContacts([...response.data])
                    })
                break
            case 'doctor':
                axiosApi
                    .get('chat/get-doctor-contacts/' + currUser?._id)
                    .then((response) => {
                        setContacts([...response.data])
                    })
                break
        }
    }, [currUser,chats])

    const handleContactSelect = (contact) => {
        onContactSelect(contact)
        onCancel()
    }

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchValue.toLowerCase())
    )

    return (
        <Modal
            open={open}
            title='Choose a contact'
            onCancel={onCancel}
            footer={null}
            width={300}>
            <Input
                placeholder='Search contacts'
                value={searchValue}
                onChange={handleSearch}
                style={{ marginBottom: '16px' }}
            />
            <div className='new-chat-contacts'>
                {filteredContacts.map((contact, index) => (
                    <Card
                        className='new-chat-contact-card'
                        key={index}
                        onClick={() => handleContactSelect(contact)}
                        style={{
                            color: 'var(--main-text-color)',
                        }}>
                        {role == 'doctor' ? '' : 'Dr.'} {contact.name}
                    </Card>
                ))}
            </div>
        </Modal>
    )
}

// Usage: Implement the ContactSelection component and handle the selected contact

export default NewChat
