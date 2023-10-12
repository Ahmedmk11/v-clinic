import { useEffect, useState } from "react";
import AdminDoctorCard from "./AdminDoctorCard"; 
import Pagination from "../../../../components/general/Pagination/Pagination";
import Search from "../../../../components/general/Search/Search";

const AdminDoctorList = ({ doctors }) => {
    
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filtereddoctors, setFiltereddoctors] = useState(doctors);
  const doctorsPerPage = 8;

  useEffect(() => {
    const filtereddoctors = doctors.filter((doctor) =>
      doctor.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltereddoctors(filtereddoctors);
    setCurrentPage(1);
  }, [searchTerm, doctors]);

  const getCurrentdoctors = () => {
    const indexOfLastdoctor = currentPage * doctorsPerPage;
    const indexOfFirstdoctor = indexOfLastdoctor - doctorsPerPage;
    const currentdoctors = filtereddoctors.slice(
      indexOfFirstdoctor,
      indexOfLastdoctor
    );
    return currentdoctors.length
      ? currentdoctors.map((doctor) => (
          <AdminDoctorCard key={doctor.id} doctor={doctor} />
        ))
      : "No doctors to show";
  };

  const onSearch = (searchString) => {
    setSearchTerm(searchString);
  };

  return (
    <section className="patient-list-conatiner">
      <h2>Doctors</h2>
      <Search onSearch={onSearch} placeholder={"username"} />
      <div className="patient-list">{getCurrentdoctors()}</div>
      <Pagination
        itemsPerPage={doctorsPerPage}
        totalItems={filtereddoctors.length}
        paginate={(pageNumber) => setCurrentPage(pageNumber)}
        currentPage={currentPage}
      />
    </section>
  );
};

export default AdminDoctorList;
