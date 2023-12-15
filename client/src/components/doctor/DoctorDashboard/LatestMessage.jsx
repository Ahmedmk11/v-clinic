import React from 'react'
import { Card, List, Avatar, Skeleton } from 'antd'
import { MessageOutlined } from '@ant-design/icons'

const LatestMessage = ({ lastMessage, loading }) => {
    const checkVideoCallMessage = (message) => {
        if (
            message.includes('Join video call at https://v-clinic.whereby.com/')
        )
            return (
                <>
                    Join video call at{'  '}
                    <a
                        className='video-call-link'
                        href={message.split('Join video call at ')[1]}
                        target='_blank'
                        rel='noreferrer'>
                        {message.split('Join video call at ')[1]}
                    </a>
                </>
            )
        return message
    }

    return (
        <Card title='Last Message from Patients' className='last-message'>
            {loading ? (
                <Skeleton active />
            ) : (
                <List
                    dataSource={lastMessage}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar icon={<MessageOutlined />} />}
                                title={item.senderName}
                                description={
                                    item?.message
                                        ? checkVideoCallMessage(item?.message)
                                        : 'Waiting for new messages'
                                }
                            />
                        </List.Item>
                    )}
                />
            )}
        </Card>
    )
}
export default LatestMessage
