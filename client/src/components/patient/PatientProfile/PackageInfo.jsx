const PackageInfo = ({ healthPackage }) => {
    return (
        <div key={healthPackage._id}>
            <p>
                <strong>Package Name: </strong>
                {healthPackage?.name}
            </p>
            <p>
                <strong>Package Price: </strong>
                {healthPackage?.price} EGP
            </p>
            <p>
                <strong>Session Discount: </strong>
                {healthPackage?.sessionDiscount} %
            </p>
            <p>
                <strong>Medicine Discount: </strong>
                {healthPackage?.medicineDiscount} %
            </p>
            <p>
                <strong>Family Package Subscribtion Discount: </strong>
                {healthPackage?.familySubsDiscount} %
            </p>
        </div>
    )
}
export default PackageInfo
