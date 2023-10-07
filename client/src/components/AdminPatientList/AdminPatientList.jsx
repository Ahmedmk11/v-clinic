import { useEffect, useState } from "react";
import AdminPatientCard from "../AdminPatientCard/AdminPatientCard";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";

const PatientList = ({ patients }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const patientsPerPage = 8;

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const filteredPatients = patients.filter((patient) =>
      patient.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filteredPatients);
    setCurrentPage(1);
  }, [searchTerm, patients]);

  const getCurrentPatients = () => {
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = filteredPatients.slice(
      indexOfFirstPatient,
      indexOfLastPatient
    );
    return currentPatients.length
      ? currentPatients.map((patient) => (
          <AdminPatientCard key={patient.id} patient={patient} />
        ))
      : "No patients to show";
  };

  const onSearch = (searchString) => {
    setSearchTerm(searchString);
  };

  return (
    <section className="patient-list-conatiner">
      <h2>Patients</h2>
      <Search onSearch={onSearch} />
      <div className="patient-list">{getCurrentPatients()}</div>
      <Pagination
        itemsPerPage={patientsPerPage}
        totalItems={filteredPatients.length}
        paginate={(pageNumber) => setCurrentPage(pageNumber)}
        currentPage={currentPage}
      />
    </section>
  );
};

export default PatientList;
