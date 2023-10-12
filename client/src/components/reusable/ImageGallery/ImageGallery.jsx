// src/components/ImageGallery.js
import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import './imageGallery.css';

const ImageGallery = ({images}) => {
    const [visible, setVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // const images = [
    //     'https://via.placeholder.com/200',
    //     'https://via.placeholder.com/200',
    //     'https://via.placeholder.com/200',
    //     // Add more image URLs as needed
    // ];

    const handleImageClick = (index) => {
        setSelectedImage(index);
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
        setSelectedImage(null);
    };

    return (
        <div className="image-gallery-container">
            <Row gutter={16}>
                {images.map((imageUrl, index) => (
                    <Col key={index} span={6}>
                        <img
                            src={imageUrl}
                            alt={`Image ${index}`}
                            className="gallery-image"
                            onClick={() => handleImageClick(index)}
                        />
                    </Col>
                ))}
            </Row>
            <Modal
                visible={visible}
                onCancel={handleClose}
                footer={[
                    <Button danger type="primary" key="close" onClick={handleClose}>
                        Close
                    </Button>
                ]}
            >
                {selectedImage !== null && <img src={images[selectedImage]} alt={`Enlarged Image ${selectedImage}`} className="enlarged-image" />}
            </Modal>
        </div>
    );
};

export default ImageGallery;
