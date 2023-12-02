import './contract.css'
const ContractContent = ({ name }) => {
    return (
        <div className='contract-content'>
            <h2 className='contract-header'>Doctor Partnership Agreement</h2>
            <p>
                This Agreement{' '}
                <strong>
                    ("Doctor Partnership Agreement for Online Medical Services")
                </strong>{' '}
                is made and entered into on this{' '}
                {new Date().toLocaleDateString()}, by and between:
            </p>
            <p>
                <strong>V-Clinic</strong> ("Clinic"), a company organized and
                existing under the laws of <strong>Egypt</strong>, and having
                its principal place of business at New Cairo,
            </p>
            <p>and</p>
            <p>
                <strong>{name}</strong> ("Doctor"), an individual practitioner.
            </p>

            <h3>1. Services:</h3>
            <p>
                The Clinic agrees to provide an online platform for the Doctor
                to offer medical services to patients registered on the Clinic's
                platform. The Doctor agrees to provide medical consultations and
                related services to patients referred by the Clinic.
            </p>

            <h3>2. Compensation:</h3>
            <p>
                The Doctor shall be compensated in accordance with the fee
                structure agreed upon between the parties. The Clinic shall
                process payments from patients and disburse the Doctor's share
                as per the agreed terms.
            </p>

            <h3>3. Confidentiality:</h3>
            <p>
                Both parties shall maintain the confidentiality of patient
                information and other sensitive data in compliance with
                applicable laws and regulations.
            </p>

            <h3>4. Term and Termination:</h3>
            <p>
                This Agreement shall commence on the effective date and continue
                until terminated by either party with [Notice Period, e.g., 30
                days] written notice. Upon termination, the Doctor shall
                complete ongoing patient treatments and cooperate with the
                Clinic to ensure a smooth transition of patient care.
            </p>

            <h3>5. Compliance:</h3>
            <p>
                The Doctor shall comply with all applicable laws, regulations,
                and professional standards related to medical practice, patient
                confidentiality, and telemedicine services.
            </p>

            <h3>6. Markup and Profit:</h3>
            <p>
                The Clinic will add a reasonable markup <strong>10%</strong> to
                the services provided by the Doctor to generate profit. The
                markup added by the system shall be used to cover administrative
                costs, platform maintenance, and to ensure the sustainability of
                the clinic's operations.
            </p>

            <h3>7. Miscellaneous:</h3>
            <ul>
                <li>
                    This Agreement constitutes the entire understanding between
                    the parties and supersedes all prior agreements and
                    understandings, whether written or oral.
                </li>
                <li>
                    Any amendments to this Agreement must be made in writing and
                    signed by both parties.
                </li>
                <li>
                    This Agreement shall be governed by and construed in
                    accordance with the laws of [Your Jurisdiction].
                </li>
            </ul>

            <p>
                IN WITNESS WHEREOF, the parties hereto have executed this
                Agreement as of the effective date first above written.
            </p>

            <div className='signature'>
                <p>V-Clinic</p>
                <p>Omar Ahmed</p>
                <p>Director of Operations</p>
                <p>{new Date().toLocaleDateString()}</p>
            </div>
        </div>
    )
}
export default ContractContent
