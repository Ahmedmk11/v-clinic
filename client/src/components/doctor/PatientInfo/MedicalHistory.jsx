import React from 'react'
import { Card, Row, Col } from 'antd'
import {
    SmileOutlined,
    MedicineBoxOutlined,
    ExperimentOutlined,
    CrownOutlined,
    ScheduleOutlined,
} from '@ant-design/icons'
import './medicalHistory.css'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'

const MedicalHistory = ({ medicalHistory }) => {
    return (
        <>
            <ConditionalRender
                condition={
                    Object.values(medicalHistory)
                        .filter((array) => Array.isArray(array))
                        .every((array) => array.length == 0) &&
                    medicalHistory.lifestyle == null &&
                    medicalHistory.familyHistory.parents.conditions.length ==
                        0 &&
                    medicalHistory.familyHistory.siblings.conditions.length == 0
                }
                elseComponent={
                    <div className='medical-history-view'>
                        <ConditionalRender
                            condition={
                                medicalHistory?.chronicConditions.length > 0
                            }>
                            <Card
                                className='history-card'
                                bordered={false}
                                cover={
                                    <SmileOutlined
                                        style={{
                                            fontSize: '48px',
                                            color: '#1890ff',
                                        }}
                                    />
                                }
                                hoverable>
                                <h3 className='main-text'>
                                    Chronic Conditions
                                </h3>
                                {medicalHistory.chronicConditions.map(
                                    (condition, index) => (
                                        <div
                                            key={index}
                                            className='condition-item'>
                                            <strong>{condition.name}</strong>
                                            <p>
                                                Diagnosed:{' '}
                                                {new Date(
                                                    condition.diagnosedDate
                                                ).toDateString()}
                                            </p>
                                            <p>
                                                Medications:{' '}
                                                {condition.medications.join(
                                                    ', '
                                                )}
                                            </p>
                                            <p>Notes: {condition.notes}</p>
                                        </div>
                                    )
                                )}
                            </Card>
                        </ConditionalRender>
                        <ConditionalRender
                            condition={medicalHistory?.surgeries.length > 0}>
                            <Card
                                className='history-card'
                                bordered={false}
                                cover={
                                    <MedicineBoxOutlined
                                        style={{
                                            fontSize: '48px',
                                            color: '#1890ff',
                                        }}
                                    />
                                }
                                hoverable>
                                <h3>Surgeries</h3>
                                {medicalHistory.surgeries.map(
                                    (surgery, index) => (
                                        <div
                                            key={index}
                                            className='surgery-item'>
                                            <strong>{surgery.name}</strong>
                                            <p>
                                                Date:{' '}
                                                {new Date(
                                                    surgery.date
                                                ).toDateString()}
                                            </p>
                                            <p>Notes: {surgery.notes}</p>
                                        </div>
                                    )
                                )}
                            </Card>
                        </ConditionalRender>
                        <ConditionalRender
                            condition={medicalHistory?.allergies.length > 0}>
                            <Card
                                className='history-card'
                                bordered={false}
                                cover={
                                    <ExperimentOutlined
                                        style={{
                                            fontSize: '48px',
                                            color: '#1890ff',
                                        }}
                                    />
                                }
                                hoverable>
                                <h3>Allergies</h3>
                                {medicalHistory.allergies.map(
                                    (allergy, index) => (
                                        <div
                                            key={index}
                                            className='allergy-item'>
                                            <strong>{allergy.name}</strong>
                                            <p>Reaction: {allergy.reaction}</p>
                                        </div>
                                    )
                                )}
                            </Card>
                        </ConditionalRender>
                        <ConditionalRender
                            condition={
                                medicalHistory?.familyHistory.parents.conditions
                                    .length > 0 ||
                                medicalHistory?.familyHistory.siblings
                                    .conditions.length > 0
                            }>
                            <Card
                                className='history-card'
                                bordered={false}
                                cover={
                                    <CrownOutlined
                                        style={{
                                            fontSize: '48px',
                                            color: '#1890ff',
                                        }}
                                    />
                                }
                                hoverable>
                                <h3>Family History</h3>
                                <div className='family-history-item'>
                                    <ConditionalRender
                                        condition={
                                            medicalHistory?.familyHistory
                                                .parents.conditions.length > 0
                                        }>
                                        <p>
                                            Parents:{' '}
                                            <strong>
                                                {medicalHistory.familyHistory.parents.conditions.join(
                                                    ', '
                                                )}
                                            </strong>
                                        </p>
                                    </ConditionalRender>
                                    <ConditionalRender
                                        condition={
                                            medicalHistory?.familyHistory
                                                .siblings.conditions.length > 0
                                        }>
                                        <p>
                                            Siblings:{' '}
                                            <strong>
                                                {medicalHistory.familyHistory.siblings.conditions.join(
                                                    ', '
                                                )}
                                            </strong>
                                        </p>
                                    </ConditionalRender>
                                </div>
                            </Card>
                        </ConditionalRender>
                        <ConditionalRender
                            condition={medicalHistory?.lifestyle}>
                            <Card
                                className='history-card'
                                bordered={false}
                                cover={
                                    <ScheduleOutlined
                                        style={{
                                            fontSize: '48px',
                                            color: '#1890ff',
                                        }}
                                    />
                                }
                                hoverable>
                                <h3>Lifestyle</h3>
                                <div className='lifestyle-item'>
                                    <ConditionalRender
                                        condition={
                                            medicalHistory?.lifestyle?.smoking
                                        }>
                                        <p>
                                            Smoking:{' '}
                                            <strong>
                                                {medicalHistory.lifestyle
                                                    ?.smoking || '-'}
                                            </strong>
                                        </p>
                                    </ConditionalRender>
                                    <ConditionalRender
                                        condition={
                                            medicalHistory?.lifestyle
                                                ?.alcoholConsumption
                                        }>
                                        <p>
                                            Alcohol:{' '}
                                            <strong>
                                                {medicalHistory.lifestyle
                                                    ?.alcoholConsumption || '-'}
                                            </strong>
                                        </p>
                                    </ConditionalRender>
                                    <ConditionalRender
                                        condition={
                                            medicalHistory?.lifestyle
                                                ?.exerciseFrequency
                                        }>
                                        <p>
                                            Exercise:{' '}
                                            <strong>
                                                {medicalHistory.lifestyle
                                                    ?.exerciseFrequency || '-'}
                                            </strong>
                                        </p>
                                    </ConditionalRender>
                                    <ConditionalRender
                                        condition={
                                            medicalHistory?.lifestyle?.diet
                                        }>
                                        <p>
                                            Diet:{' '}
                                            <strong>
                                                {medicalHistory.lifestyle
                                                    ?.diet || '-'}
                                            </strong>
                                        </p>
                                    </ConditionalRender>
                                </div>
                            </Card>
                        </ConditionalRender>
                    </div>
                }>
                <p style={{ marginTop: 0 }}>No medical records</p>
            </ConditionalRender>
        </>
    )
}

export default MedicalHistory
