### Badges
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant%20Design-0170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### <img src="./client/src/assets/icons/logoBlue.svg" alt="V-Clinic Icon" width="150" height="150"> 

## Table of Contents
- [About the Project](#about-the-project)
- [Motivation](#motivation)
- [Build Status](#build-status)
- [Code Quality and Style Enforcement](#code-quality-and-style-enforcement)
- [Tech/Framework Used](#techframework-used)
- [Screenshots](#screenshots)
- [Features](#features)
- [Code Examples](#code-examples)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Tests](#tests)
- [How to Use?](#how-to-use)
- [Contribute](#contribute)
- [Credits](#credits)
- [License](#license)

## About the Project:

V-Clinic is a revolutionary virtual clinic solution designed to streamline healthcare interactions among patients, medical professionals, and clinics. Our platform aims to automate and simplify various healthcare processes, including appointment scheduling, medical record access, prescription management, and seamless communication between doctors and patients.

**Target Audience:**

Our platform caters to patients seeking convenient healthcare services, medical professionals (doctors) looking for efficient patient management tools, and clinics aiming to optimize their healthcare service offerings.

**Differentiation:**

V-Clinic stands out through its focus on providing a comprehensive healthcare solution that integrates various essential aspects of patient-doctor interactions. One of its core strengths lies in its seamless connection to a pharmacy system, facilitating streamlined prescription management and medication orders alongside doctor-patient communication, secure medical record management, and simplified appointment scheduling.

---

## Motivation

Healthcare interactions often involve various inefficiencies, from cumbersome appointment scheduling and inaccessible medical records to complex prescription management. V-Clinic is motivated by the need to address these challenges and revolutionize the healthcare industry by offering a unified platform for patients, doctors, and clinics. Our goal is to provide a seamless experience, bridging the gap between patients and healthcare providers while optimizing the healthcare journey for all stakeholders involved.

---

## Build Status

- The project is currently in active development.
- **Deployment Plan:** Scheduled deployment through AWS Services or similar platforms in the near future.
- **Initiating End-to-End Testing:** Commencing efforts to enhance End-to-End (E2E) tests, aiming for more comprehensive coverage.
- **Current Build Update:** The latest build of the project has undergone meticulous review and improvements. Sprint 3 evaluation and feedback sessions helped in correcting minor tweaks. The system now stands refined, addressing reviews, progress updates, and discounts. Additionally, the system boasts several advanced features beyond the core functionalities.

---

## Code Quality and Style Enforcement 

[![Code Style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)


**ESLint (Backend & Frontend):** Employed for enforcing clean, optimal, and consistent code practices in both backend and frontend development. ESLint is configured to define and enforce rules ensuring a unified code style among team members.

**Prettier:** Functions as an automated code formatter that runs before each commit, maintaining consistent and visually appealing code across the entire project. It ensures standardized code formatting for enhanced readability and consistency.

These tools, ESLint for code rule enforcement and Prettier for code formatting, collectively help maintain a high level of code quality, readability, and consistency within the project.

---

## Tech/Framework Used

The project is built on the MERN stack, which comprises the following technologies:

- **MongoDB:** A NoSQL database used for storing data in a flexible, JSON-like format.
- **Express.js:** A Node.js web application framework used for building robust APIs and web applications.
- **React:** A JavaScript library for building interactive and dynamic user interfaces.
- **Node.js:** A JavaScript runtime environment used for server-side scripting and building scalable applications.
  
In addition to the core stack, the project incorporates several essential APIs and integrations to enhance its functionality:

- **JWT (JSON Web Tokens):** Used for secure authentication and authorization, JWT plays a pivotal role in ensuring data security and user access control.
- **Socket.IO:** Enabling real-time communication, Socket.IO enhances the platform with live chat functionality, fostering immediate interaction between users and pharmacists.
- **Stripe:** Integrated for seamless and secure payment processing, Stripe ensures a smooth transaction experience for purchasing medicines.
- **Multer:** Employed for handling file uploads, Multer simplifies the process of uploading prescription files, enhancing the prescription-based medication purchase feature.
- **Nodemailer:** Integrated for email functionality, Nodemailer facilitates the sending of notifications and updates to users, enhancing communication within the platform.
- **React-PDF:** Utilized for PDF rendering within the application, React-PDF enhances the platform's functionality by providing robust PDF display capabilities, supporting various document formats.
- **Whereby:** Utilized for video chat integration, Whereby provides a seamless video conferencing experience, allowing users to engage in remote consultations with healthcare professionals.
- **News API:** Integrated to display the most recent news, the News API feature enriches the platform with up-to-date information and news articles for users' reference and awareness.
- **Recharts:** 
  Recharts, a charting library for React, is employed to create intuitive and visually appealing data visualizations within the application.

These technologies and APIs collectively form the foundation of the project, enabling a comprehensive full-stack JavaScript-based development approach. Understanding and familiarity with these technologies are crucial for comprehending, contributing to, and further enhancing the project.

---
<details>
<summary>
  
## Screenshots
</summary>

- #### Sign in using username and password.

<img width="1000" alt="login" src="./screenshots/login.png">

- #### Sign up as a patient.

<img width="1000" alt="signup" src="./screenshots/registeration.png">

- #### light and dark mode.

<img width="500" margin="20" alt="light" src="./screenshots/light_mode.png"> <img width="500" alt="dark" src="./screenshots/dark_mode.png">

- #### Doctor Dashboard.

<img width="1000" alt="doctor" src="./screenshots/doctor_dashboard.png">

- #### Doctor view and edit profile.

<img width="1000" alt="doctor" src="./screenshots/doctor_profile.png">

- #### Doctor view and add free time slots.

<img width="1000" alt="doctor" src="./screenshots/add_time_slots.png">

- #### Doctor view appointments.

<img width="1000" alt="doctor" src="./screenshots/doctor_apps.png">

- #### Doctor chat with patient.

<img width="1000" alt="chat" src="./screenshots/chat.png">

- #### Patient Profile.

<img width="1000" alt="patient" src="./screenshots/patient_profile.png">

- #### Patient view health subscribed package.

<img width="1000" alt="patient" src="./screenshots/view_health_package.png">

- #### Patient subscribe to health package.

<img width="1000" alt="patient" src="./screenshots/subscribe_health_pack.png">

- #### Patient upload and view medical history files.

<img width="1000" alt="patient" src="./screenshots/medical_history.png">

- #### Patient view medical records.

<img width="1000" alt="patient" src="./screenshots/medical_records.png">

- #### Patient view selected prescription.

<img width="1000" alt="patient" src="./screenshots/prescription.png">

- #### Patient view active doctors.

<img width="1000" alt="patient" src="./screenshots/view_doctors.png">

- #### Patient view doctor's slots.

<img width="1000" alt="patient" src="./screenshots/view_doctor_free_slots.png">

- #### Patient book appointment.

<img width="1000" alt="patient" src="./screenshots/reserve_app.png">

- #### Admin Dashboard.

<img width="1000" alt="admin" src="./screenshots/admin_dashboard.png">

- #### Admin view doctors' requests.

<img width="1000" alt="admin" src="./screenshots/view_requests.png">

- #### Admin view available health packages.

<img width="1000" alt="admin" src="./screenshots/view_packages.png">

</details>

## Features

- **Appointment Reservation:** Patients can reserve and pay for appointments with doctors through our website.

- **Linking Family Members:** Patients have the option to link family members which allows them to reserve appointments for them.

- **Package Subscriptions:** Patients can subscribe to packages to get discounts on medicines and appointments.

- **Appointment Timings:** Doctors have the option to select their working hours and the system divides the shift into appointments that can be reserved.

- **Medical History/Medical Records:** Doctors have access to their patient's Medical history and records.
  
- **Prescription Purchase:** Integration with V-Pharmacy allows the patients to purchase their prescriptions online.
  
- **Credit Card and Wallet Payment:** Patients can choose to pay for appointments, packages, and prescriptions through credit card or wallet.

- **Video Chat with Doctors:** Reserved appointments can be conducted online through our video chat feature. 

- **Live Text Chat with Doctors:** Patients have the option to text chat with doctors, if needed.



|       Feature                   |  Status  |
| -------------------------- | :----------------:| 
| Authentiation            |         ✔️         |    
| Authorization            |         ✔️         |    
| User Roles             |         ✔️         |    
| Payments         |         ✔️         |   
| User Email Notifications  |         ✔️         |      
| User Password Reset    |         ✔️         |
| Upload PDFs/Images    |         ✔️         |




## Code Examples
- **Viewing Patients in Frontend:**
```javascript
const ViewPatients = () => {
    const { currUser: Doctor } = useContext(CurrUserContext)
    const [Patients, setPatients] = useState([])
    const [skeleton, setSkeleton] = useState(true)
    useEffect(() => {
        {
            Doctor && fetchPatients()
        }
    }, [Doctor])
    const fetchPatients = () => {
        axiosApi
            .get(`/patient/get-patients-by-doctor-id/${Doctor._id}`)
            .then((res) => setPatients(res.data))
            .catch((err) => console.log(err))
            .finally(() => setSkeleton(false))
    }
    return (
        <div className='page'>
            <PatientList patients={Patients} skeleton={skeleton} />
        </div>
    )
}
export default ViewPatients


const PatientList = ({ patients, skeleton }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredPatients, setFilteredPatients] = useState([])
    const [showUpcomingAppointments, setShowUpcomingAppointments] =
        useState(false)
    const patientsPerPage = 8

    useEffect(() => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const filteredPatients = patients.filter(
            (patient) =>
                (!showUpcomingAppointments ||
                    new Date(patient.nextAppointment) >= today) &&
                patient.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPatients(filteredPatients)
        setCurrentPage(1)
    }, [searchTerm, showUpcomingAppointments, patients])

    const getCurrentPatients = () => {
        const indexOfLastPatient = currentPage * patientsPerPage
        const indexOfFirstPatient = indexOfLastPatient - patientsPerPage
        const currentPatients = filteredPatients.slice(
            indexOfFirstPatient,
            indexOfLastPatient
        )
        if (skeleton)
            return (
                <>
                    <div className='card'>
                        <Skeleton active />
                    </div>
                </>
            )
        return currentPatients.length
            ? currentPatients.map((patient) => (
                  <PatientCard key={patient._id + '0'} patient={patient} />
              ))
            : 'No patients to show'
    }

    const onSearch = (searchString) => {
        setSearchTerm(searchString, true)
    }

    const onCheckboxChange = () => {
        setShowUpcomingAppointments(!showUpcomingAppointments)
    }

    return (
        <section className='primary-container patient-list-container'>
            <h2>My Patients</h2>
            <Search onSearch={onSearch} />
            <label>
                Show Upcoming Appointments
                <input
                    type='checkbox'
                    checked={showUpcomingAppointments}
                    onChange={onCheckboxChange}
                />
            </label>
            <div className='card-list'>{getCurrentPatients()}</div>
            <Pagination
                itemsPerPage={patientsPerPage}
                totalItems={filteredPatients.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
                currentPage={currentPage}
            />
        </section>
    )
}

export default PatientList


const PatientCard = ({ patient }) => {
    const navigate = useNavigate()
    const handlePatientSelect = () => {
        navigate(`/doctor/patient/info/${patient._id}`)
    }
    return (
        <div className='card'>
            <h3>{patient.name}</h3>
            <p>
                <strong>Age: </strong>
                {calcAge(patient.birthdate)}
            </p>
            <p>
                <strong>Gender: </strong>
                {patient.gender}
            </p>
            <p>
                <strong>Last Visit: </strong>
                {patient.lastVisit
                    ? new Date(patient.lastVisit).toLocaleString()
                    : 'No previous visits'}
            </p>
            <p>
                <strong>Next Appointment: </strong>
                {patient.nextAppointment
                    ? new Date(patient.nextAppointment).toLocaleString()
                    : 'No upcoming appointments'}
            </p>
            <div className='edit-buttons'>
                <Button type='primary' onClick={handlePatientSelect}>
                    View Records
                </Button>
            </div>
        </div>
    )
}

export default PatientCard


```
- **Adding doctor documents in Backend:**
```javascript
// @desc    Upload a doctor image
// @route   POST /api/doctor/upload
// @access  Public
const uploadDoctorFiles = async (req, res) => {
    try {
        const id = req.body.id
        const files = req.files
        if (!files?.length)
            return res.status(400).json({ message: 'No files uploaded' })
        const doctor = await DoctorModel.findById(id)
        if (doctor) {
            const newFilePaths = files.map((file) => file.path)
            doctor.uploaded_documents =
                doctor.uploaded_documents.concat(newFilePaths)
            doctor.save()
            res.json({
                message: 'Files uploaded successfully',
                uploaded_documents: doctor.uploaded_documents,
            })
        } else {
            res.status(404).json({ message: 'Doctor not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
```


---


## Installation

To run the project locally, follow these steps:

- **Clone this repository.**

```bash
git clone <repository_url>
```

- **Navigate to the project directory.**

```bash
cd balabizo-pharmacy
```

- **Navigate to the socket directory, install dependencies and start the socket server**

```bash
cd socket
npm install
npm start
```

- **Navigate to the client directory, install dependencies and start the client**

```bash
cd client
npm install
npm start
```

#### Before running the project, make sure you have the following environment variables set:

- `CONN_STRING`: [Your MongoDB Connection String]
- `JWT_SECRET`: [Your JWT Secret Key]
- `GMAIL_PASSWORD`: [Your Gmail Account Password for Nodemailer]
- `STRIPE_PRIVATE_KEY`: [Your Stripe Private Key]
- `STRIPE_PUBLISHABLE_KEY`: [Your Stripe Publishable Key]
- `WHEREBY_API_KEY`: [Your Whereby API Key]
- `API_URL`: [Your API URL]

---

## API Documentation

### Admin APIs
#### Get all admins
```http
  GET api/admin/getAllAdmins
```
<details>
 <summary>
  Response
 </summary>
 
 ```json
 [{"_id":"65549d1e57bc513a3937689a","username":"admin","name":"admin","email":"admin@gmail.com","password":"$2b$12$FRAIfWM/OB7GqReNEsTcUuqlaeiXDrMrJgWvg2bLkEEFExNxPnBce","createdAt":"2023-11-15T10:27:42.499Z","updatedAt":"2023-11-15T10:27:42.499Z","__v":0}
,{"_id":"656cafccc1eab0a408e91bb3","username":"admin2","name":"Ahmed Mahmoud","email":"ahmedmahmoudkzem@gmail.com","password":"$2b$12$ER84B8lTOO8EZKImeLvN4uMstTHaYy0vzcjdpgS/eYXOefF0jDDOu","createdAt":"2023-12-03T16:41:48.241Z","updatedAt":"2023-12-03T16:41:48.241Z","__v":0}]
 ```
 </details>

 #### Get all doctors
```http
  GET api/admin/getAllDoctors
```
<details>
 <summary>
  Response
 </summary>
 
 ```json
 [{"_id":"6554a105602bb02ebd8ebf4e","username":"belly","name":"Belly","email":"belly@gmail.com","password":"$2b$12$4kyeuY6a62vLv6KSFt3xS.UAKVwsH.F6cvW6.4UYjSV32AlTyZlky","dob":"2023-11-06T00:00:00.000Z","hourly_rate":400,"affiliation":"WHO","education":"Oxford","wallet":0,"status":"Pending","contract_acceptance":"Pending","speciality":"Neurologist","uploaded_documents":[],"timeSlots":[],"__v":0},{"_id":"6563448aa7d20ecb01722ace","username":"doc3","name":"jojo","email":"ahmedmahmoudkm@gmail.com","password":"$2b$12$vM37et5vm4tS4/M8HYGAbueI3Fg2CiUi26NyVX0hb9PAIfGZpgc8S","dob":"2023-11-01T00:00:00.000Z","hourly_rate":100,"affiliation":"Wedan","education":"GUC","wallet":0,"status":"Pending","contract_acceptance":"Pending","speciality":"Wedan","uploaded_documents":[],"timeSlots":[],"__v":0}]
 ```
 </details>

  #### Get all patients
```http
  GET api/admin/getAllPatients
```
<details>
 <summary>
  Response
 </summary>
 
 ```json
 [{"_id":"65549e9657bc513a393768a7","username":"saleh","name":"Saleh","email":"salehmohamad210@gmail.com","password":"$2b$12$BgLM.3TZBgT7VF/Vr55ZBOS3b4LaBdYE0RrWOouVlOErbxW2GJY..","wallet":259472,"birthdate":"1715-01-01T00:00:00.000Z","gender":"male","phoneNumber":"01234567890","emergencyName":"Omar","emergencyPhoneNumber":"11111114311","linkingCode":"3633a99b6e072a88959f55737ac2efda","packageRenewalDate":"2024-12-01T22:00:00.000Z","packageStatus":"Active","isAutoRenewalBlocked":false,"health_records":[],"__v":1,"package":"65549d7d57bc513a3937689e","emergencyRelation":"brother","deliveryAddress":[],"nid":"00000000000000"},
{"_id":"65549ed257bc513a393768ac","username":"karma","name":"Karma","email":"karma@gmail.com","password":"$2b$12$pSzoAsHduCxZ9Fff2bT5OeJnFk1XfpT3pjSp.jKF76g.xr6Qhszt6","wallet":1584,"birthdate":"1719-01-15T00:00:00.000Z","gender":"female","phoneNumber":"11111111121","emergencyName":"Saleh","emergencyPhoneNumber":"11111111111","linkingCode":"e4df903ff18574e5e60c6527abccc1ca","packageRenewalDate":"2024-11-25T22:00:00.000Z","packageStatus":"Inactive","isAutoRenewalBlocked":false,"health_records":[],"__v":0,"package":"65549dce57bc513a393768a4","nid":"00000000000001","deliveryAddress":[]}]
 ```
 </details>

#### Check out our full API Documentation on Postman by clicking [here](https://documenter.getpostman.com/view/29807347/2s9Ykn8h1C)
#### Check out our API Workspace on Postman by clicking [here](https://www.postman.com/speeding-crescent-574741/workspace/acl-v-clinic)

<br/>
<a href="https://www.getpostman.com/"><img src="https://assets.getpostman.com/common-share/postman-logo-horizontal-320x132.png" /></a><br />


<br/><br/>
 

## Tests

**Testing Process Used with Postman**

During the development phase of this project, We conducted various tests using Postman to ensure functionality and reliability.

- **Endpoint Validation:**

Employed Postman to test each API endpoint individually, verifying their functionalities by sending distinct requests (GET, POST, PUT, DELETE, etc.) to specific routes.

Checked the response data against expected outcomes, ensuring proper functionality.

- **Authentication and Authorization:**

Tested the authentication mechanism, validating correct authentication and handling of invalid credentials.

Ensured proper authorization by attempting access to restricted routes and verifying the response for unauthorized access.

- **Data Integrity and Error Handling:**

Conducted tests with different sets of data to validate input validation and response integrity.

Simulated error scenarios by intentionally sending incorrect requests, ensuring the API provided accurate error messages and appropriate HTTP status codes.

- **Cross-Functional Testing:**

Tested the integration between different functionalities to ensure seamless operation across various parts of the system.

These tests allowed for thorough validation and verification of the project's functionalities during the development phase. They helped in identifying and rectifying issues, ensuring the robustness and reliability of the API endpoints.

---

## How to Use?

### For Doctors:

- **Registration and Document Upload:**
  
Navigate to the registration page and sign up by providing required professional information.

- **Login and Document Upload:**
  
Log in to your account using the provided credentials.
Complete your profile and upload necessary documents for verification purposes, such as medical certifications and credentials.

- **Verification Process:**

After submitting your profile and documents, our team will review the provided information.
Upon approval, you'll receive a notification requesting contract acceptance to gain access to the full platform functionalities.

- **Acceptance of Contract:**

Once verified, you'll be prompted to review and accept the contract terms provided in the notification.
Upon accepting the contract, you'll gain access to the complete range of platform features, including patient interactions, prescription management, and live consultations.

- **Access Website Features:**
  
Access the dashboard and utilize the comprehensive suite of website features. This includes managing prescriptions, interacting with patients through live chat, and providing remote consultations.

### For Patients:

- **Sign Up:**

Visit the registration page and create an account by filling in the required details.

- **Login and Start Exploring:**

Log in to your account using the provided credentials.

Explore the various features available, such as browsing and purchasing medicines, tracking orders, and engaging in live chat with registered pharmacists for assistance or queries.

---

## Contribute

We encourage and value contributions from the community! If you're interested in contributing to this project feel free to reach out to us via email at yousseftamer1990@gmail.com. We look forward to collaborating with you!

Your contributions, whether it's in the form of code, suggestions, or bug fixes, are highly appreciated and vital to the project's growth and improvement.

---

## Credits

### Ant Design

We would like to extend our gratitude to Ant Design for providing a rich collection of UI components and design resources that significantly contributed to the user interface of this project. Their robust and customizable components have enhanced the visual appeal and functionality of our platform.

### Net Ninja and Web Dev Simplified

We express our appreciation to Net Ninja and Web Dev Simplified for their invaluable online tutorials and educational content. The insightful tutorials, explanations, and guidance from these platforms have been instrumental in shaping our understanding of various web development concepts, enabling us to build and improve this project effectively.

### Video Tutorials for Implementation

We acknowledge and appreciate the instructional content provided by Lama Dev and openJavaScript on YouTube in their videos:

- [Text Chat Implementation](https://youtu.be/HggSXt1Hzfk?si=j8AvgiF1CscbgHIQ) : Utilized for implementing the text chat feature in our project.
- [Upload Functionality Tutorial](https://youtu.be/TZvMLWFVVhE?si=rT2CIJLey6owPnd0) : Used as a resource during the implementation of upload functionality in our project.

The guidance and insights shared in these videos have been invaluable in the development of this project.

---

## License

This project is licensed under both the MIT License and the Apache License 2.0.