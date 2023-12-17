import { Button, message, Dropdown, Menu } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import './familyMemberCard.css'
import axiosApi from '../../../utils/axiosApi'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'

const FamilyMemberCard = ({ member, relation, family, setFamily }) => {
    const handleCancelSubscirption = () => {
        console.log(member)
        axiosApi
            .post(`/patient/add-package/${member?._id}`, {
                packageID: '-1',
            })
            .then((res) => {
                const updatedFamily = family?.map((familyMember) => {
                    if (familyMember._id === familyMember._id) {
                        return {
                            ...familyMember,
                            package: res.data.package,
                            packageStatus: 'Inactive',
                        }
                    }
                    return familyMember
                })
                setFamily(updatedFamily)
                message.success('Package cancelled successfully')
            })
            .catch((err) => {
                message.error('Something went wrong')
                console.log(err)
            })
    }

    return (
        <div className='member-card'>
            <h3>{relation}</h3>

            <div>
                <strong>Name: </strong> {member?.name}
            </div>
            <div>
                <strong>Email: </strong> {member?.email}
            </div>
            <div>
                <strong>Phone Number: </strong> {member?.phoneNumber}
            </div>
            <div>
                <strong>Subscribed Package: </strong>{' '}
                <span>
                    {member?.package?.name ?? 'Not subscribed to a package'}{' '}
                </span>
                <ConditionalRender condition={member?.package != null}>
                    <Dropdown
                        getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode
                        }
                        overlayClassName='drpdn-class'
                        placement='right'
                        overlay={
                            <Menu>
                                <Menu.Item>
                                    {
                                        <div className='package-info'>
                                            <p>
                                                <span
                                                    style={{
                                                        fontWeight: 700,
                                                    }}>
                                                    Price:
                                                </span>{' '}
                                                ${member?.package?.price}
                                            </p>
                                            <p>
                                                <span
                                                    style={{
                                                        fontWeight: 700,
                                                    }}>
                                                    Session Discount:{' '}
                                                </span>{' '}
                                                {
                                                    member?.package
                                                        ?.sessionDiscount
                                                }
                                                %
                                            </p>
                                            <p>
                                                <span
                                                    style={{
                                                        fontWeight: 700,
                                                    }}>
                                                    Pharmacy Discount:{' '}
                                                </span>{' '}
                                                {
                                                    member?.package
                                                        ?.medicineDiscount
                                                }
                                                %
                                            </p>
                                            <p>
                                                <span
                                                    style={{
                                                        fontWeight: 700,
                                                    }}>
                                                    Family Discount:{' '}
                                                </span>{' '}
                                                {
                                                    member?.package
                                                        ?.familySubsDiscount
                                                }
                                                %
                                            </p>
                                        </div>
                                    }
                                </Menu.Item>
                            </Menu>
                        }>
                        <InfoCircleOutlined />
                    </Dropdown>
                </ConditionalRender>
            </div>
            {/* <ConditionalRender
                condition={
                    member.packageRenewalDate != null &&
                    member?.packageStatus != 'Inactive'
                }>
                <div>
                    <strong>Auto Renewal: </strong>
                    {new Date(member.packageRenewalDate).toDateString()}
                </div>
            </ConditionalRender> */}
            <div>
                <ConditionalRender
                    condition={
                        member?.package && member?.packageStatus == 'Inactive'
                    }>
                    <p style={{ fontSize: 11 }}>
                        *Subscribtion will expire on{' '}
                        {new Date(member?.packageRenewalDate).toDateString()}
                    </p>
                </ConditionalRender>
                <ConditionalRender
                    condition={
                        member?.package && member?.packageStatus == 'Active'
                    }>
                    <p style={{ fontSize: 11 }}>
                        *Subscribtion will automatically renew on{' '}
                        {new Date(member?.packageRenewalDate).toDateString()}
                    </p>
                </ConditionalRender>
            </div>
            <div className='edit-buttons'>
                <Button
                    disabled={
                        (member?.package &&
                            member?.packageStatus != 'Active') ||
                        member?.package?.name == null
                    }
                    danger
                    onClick={handleCancelSubscirption}>
                    Cancel Subscription
                </Button>
            </div>
        </div>
    )
}

export default FamilyMemberCard
