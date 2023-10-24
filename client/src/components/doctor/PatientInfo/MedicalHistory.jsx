import React from 'react';
import { Card, Row, Col } from 'antd';
import {
    SmileOutlined,
    MedicineBoxOutlined,
    ExperimentOutlined,
    CrownOutlined,
    ScheduleOutlined,
} from '@ant-design/icons';
import './medicalHistory.css';

const MedicalHistory = ({ medicalHistory }) => {
    return (<>
        <div className="medical-history-view">
                    <Card className="history-card" bordered={false} cover={<SmileOutlined style={{ fontSize: '48px', color: '#1890ff' }} />} hoverable>
                        <h3>Chronic Conditions</h3>
                        {medicalHistory.chronicConditions.map((condition, index) => (
                            <div key={index} className="condition-item">
                                <strong>{condition.name}</strong>
                                <p>Diagnosed: {new Date(condition.diagnosedDate).toDateString()}</p>
                                <p>Medications: {condition.medications.join(', ')}</p>
                                <p>Notes: {condition.notes}</p>
                            </div>
                        ))}
                    </Card>
              
                    <Card className="history-card" bordered={false} cover={<MedicineBoxOutlined style={{ fontSize: '48px', color: '#1890ff' }} />} hoverable>
                        <h3>Surgeries</h3>
                        {medicalHistory.surgeries.map((surgery, index) => (
                            <div key={index} className="surgery-item">
                                <strong>{surgery.name}</strong>
                                <p>Date: {new Date(surgery.date).toDateString()}</p>
                                <p>Notes: {surgery.notes}</p>
                            </div>
                        ))}
                    </Card>
        
              
                    <Card className="history-card" bordered={false} cover={<ExperimentOutlined style={{ fontSize: '48px', color: '#1890ff' }} />} hoverable>
                        <h3>Allergies</h3>
                        {medicalHistory.allergies.map((allergy, index) => (
                            <div key={index} className="allergy-item">
                                <strong>{allergy.name}</strong>
                                <p>Reaction: {allergy.reaction}</p>
                            </div>
                        ))}
                    </Card>
              
             
                    <Card className="history-card" bordered={false} cover={<CrownOutlined style={{ fontSize: '48px', color: '#1890ff' }} />} hoverable>
                        <h3>Family History</h3>
                        <div className="family-history-item">
                            <p>Parents: <strong>{medicalHistory.familyHistory.parents.conditions.join(', ')}</strong></p>
                            <p>Siblings: <strong>{medicalHistory.familyHistory.siblings.conditions.join(', ')}</strong></p>
                        </div>
                    </Card>
               
                
                    <Card className="history-card" bordered={false} cover={<ScheduleOutlined style={{ fontSize: '48px', color: '#1890ff' }} />} hoverable>
                        <h3>Lifestyle</h3>
                        <div className="lifestyle-item">
                            <p>Smoking: <strong>{medicalHistory.lifestyle.smoking}</strong></p>
                            <p>Alcohol: <strong>{medicalHistory.lifestyle.alcoholConsumption}</strong></p>
                            <p>Exercise: <strong>{medicalHistory.lifestyle.exerciseFrequency}</strong></p>
                            <p>Diet: <strong>{medicalHistory.lifestyle.diet}</strong></p>
                        </div>
                    </Card>
             

        </div>
                        </>
    );
};

export default MedicalHistory;
