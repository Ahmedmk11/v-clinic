import { useState, useContext } from 'react'
import { Modal, Button, message } from 'antd'
import ContractContent from './ContractContent'
import CurrUserContext from '../../../contexts/CurrUser'
import axiosApi from '../../../utils/axiosApi'

const Contract = ({ visible, onCancel }) => {
    const { currUser: Doctor, setCurrUser: setDoctor } =
        useContext(CurrUserContext)
    const [isAcceptModalVisible, setIsAcceptModalVisible] = useState(false)
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false)

    const onReject = () => {
        axiosApi
            .put(`/doctor/update-contract`, {
                id: Doctor._id,
                contract_acceptance: 'Rejected',
            })
            .then((res) => {
                setDoctor({
                    ...Doctor,
                    contract_acceptance: res.data.contract_acceptance,
                })
                setIsRejectModalVisible(false)
                onCancel()
                message.success('Contract rejected')
            })
            .catch((err) => {
                console.log(err)
                message.error('Failed to update contract rejection')
            })
    }
    const onAccept = () => {
        axiosApi
            .put(`/doctor/update-contract`, {
                id: Doctor._id,
                contract_acceptance: 'Accepted',
            })
            .then((res) => {
                setIsAcceptModalVisible(true)
            })
            .catch((err) => {
                console.log(err)
                message.error('Failed to update contract acceptance')
            })
    }

    const onCancelAccept = () => {
        setDoctor({
            ...Doctor,
            contract_acceptance: "Accepted",
        })
        setIsAcceptModalVisible(false)
        message.success('Contract accepted successfully')
        onCancel()
    }
    const onCancelReject = () => {
        setIsRejectModalVisible(false)
    }

    return (
        <>
            <Modal
                open={visible}
                onCancel={onCancel}
                footer={[
                    <Button
                        key='reject'
                        type='primary'
                        danger
                        onClick={() => setIsRejectModalVisible(true)}>
                        Reject
                    </Button>,
                    <Button
                        key='accept'
                        type='primary'
                        onClick={onAccept}>
                        Accept
                    </Button>,
                ]}
                width={800}>
                <ContractContent name={Doctor?.name} />
            </Modal>
            <Modal
                title='Congratulations on joining our community!'
                open={isAcceptModalVisible}
                onCancel={onCancelAccept}
                footer={[
                    <Button
                        key='accept'
                        type='primary'
                        onClick={onCancelAccept}>
                        Ok
                    </Button>,
                ]}>
                You have accepted the partnership agreement.
            </Modal>
            <Modal
                title='Sad to see you go!'
                open={isRejectModalVisible}
                onCancel={onCancelReject}
                footer={[
                    <Button
                        key='reject'
                        onClick={onCancelReject}>
                        Cancel
                    </Button>,
                    <Button
                        key='accept'
                        type='primary'
                        danger
                        onClick={onReject}>
                        Sure
                    </Button>,
                ]}>
                Are you sure you want to reject the partnership agreement?
            </Modal>
        </>
    )
}
export default Contract
