import React from 'react';
import { Card, Row, Col } from 'antd';
import './pastPrescriptions.css';

const { Meta } = Card;

const PastPrescriptions = ({ prescriptions }) => {
    return (
        <div className="prescription-container">
            {prescriptions.map((prescription, index) => (
                <Card
                    key={index}
                    title={prescription.name}
                    className="prescription-card"
                    style={{ width: 400 }} // Set the width of the prescription card
                    >
                    <div><strong>Date: </strong>{new Date(prescription.date).toDateString()}</div>
                    <h3>Medications: </h3>
                                        <Row gutter={[16, 16]}> {/* Set horizontal and vertical spacing between cards */}
                        {prescription.medications.map((medication, idx) => (
                            <Col span={12} key={idx}> {/* Each medication takes half the width */}
                                <Card className="medication-card">
                                    <Meta
                                        title={medication.name}
                                        description={
                                            <>
                                                <strong>Dosage:</strong> {medication.dosage}<br />
                                                <strong>Duration:</strong> {medication.duration}<br />
                                                <strong>Frequency:</strong> {medication.frequency}
                                            </>
                                        }
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Card>
            ))}
        </div>
    );
};

export default PastPrescriptions;
