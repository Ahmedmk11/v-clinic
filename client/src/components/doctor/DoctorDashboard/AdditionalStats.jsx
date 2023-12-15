import React from 'react'
import { Card, Statistic, Skeleton } from 'antd'

const AdditionalStats = ({ additionalStats, loading }) => {
    return (
        <Card title='Additional Stats' className='additional-stats'>
            {loading ? (
                <Skeleton active />
            ) : (
                additionalStats.map((stat, index) => (
                    <Statistic
                        key={index}
                        title={stat.title}
                        value={stat.value}
                    />
                ))
            )}
        </Card>
    )
}
export default AdditionalStats
