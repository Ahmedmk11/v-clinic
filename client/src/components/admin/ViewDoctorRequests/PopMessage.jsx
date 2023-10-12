import React, { useState } from 'react'
import { message, Popconfirm } from 'antd'
const PopMessage = ({ record, title, Button, onConfirm }) => {
    const [open, setOpen] = useState(false)
    const confirm = () => {
        setOpen(false)
            onConfirm(record)
           
   
    }
    const cancel = () => {
        setOpen(false)
        message.error('Cancelled.')
    }
    const handleOpenChange = (newOpen) => {
        if (!newOpen) {
            setOpen(newOpen)
            return
        }
        setOpen(newOpen)
    }
    return (
        <Popconfirm
            title={title}
            description="Action can not be undone. "
            open={open}
            onOpenChange={handleOpenChange}
            onConfirm={confirm}
            onCancel={cancel}
            okText='Yes'
            cancelText='Cancel'>
            {Button}
        </Popconfirm>
    )
}
export default PopMessage
