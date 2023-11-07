// src/components/ImageGallery.js
import React, { useState, useContext } from 'react'
import { Modal, Button, Spin, Col } from 'antd'
import './imageGallery.css'
import noImage from '/src/assets/imgs/noImage.png'
import CurrUserContext from '../../../contexts/CurrUser'
import ConditionalRender from '../ConditionalRender/ConditionalRender'
const ImageGallery = ({ images, onRemoveImage }) => {
    const [visible, setVisible] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [imageLoadingStates, setImageLoadingStates] = useState(
        Array(images?.length).fill(true)
    )
    const { role } = useContext(CurrUserContext)

    const handleImageClick = (index) => {
        setSelectedImage(index)
        setVisible(true)
    }

    const handleClose = () => {
        setVisible(false)
        setSelectedImage(null)
    }

    return (
        <div className='image-gallery-container'>
            {images?.map((imageUrl, index) => (
                <Col key={index} span={6}>
                    {imageLoadingStates[index] && (
                        <Spin className='loader' size='large' />
                    )}
                    <img
                        src={imageUrl}
                        alt={`Image ${index}`}
                        className={
                            'gallery-image ' +
                            (imageLoadingStates[index] ? ' hidden' : '')
                        }
                        onClick={() => handleImageClick(index)}
                        onLoad={() => {
                            imageLoadingStates[index] = false
                            setImageLoadingStates([...imageLoadingStates])
                        }}
                        onError={(e) => {
                            e.target.src = noImage
                            images[index] = noImage
                        }}
                    />
                </Col>
            ))}
            <Modal
                open={visible}
                onCancel={handleClose}
                footer={
                    <ConditionalRender condition={role === 'patient'}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                            }}>
                            <Button danger type='primary'  onClick={()=>onRemoveImage(images[selectedImage], setVisible)}>
                                Remove Image
                            </Button>
                        </div>
                    </ConditionalRender>
                }>
                {selectedImage !== null && (
                    <img
                        style={{ marginTop: '25px' }}
                        src={images[selectedImage]}
                        alt={`Enlarged Image ${selectedImage}`}
                        className='enlarged-image'
                    />
                )}
            </Modal>
        </div>
    )
}

export default ImageGallery
