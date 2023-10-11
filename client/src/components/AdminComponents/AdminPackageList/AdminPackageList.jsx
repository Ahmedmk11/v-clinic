import { useEffect, useState } from "react";
import AdminPackageCard from "../AdminPackageCard/AdminPackageCard"; 
import Pagination from "../../Pagination/Pagination";
import Search from "../../Search/Search";

const AdminPackageList = ({ Packages }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPackages, setFilteredPackages] = useState(Packages);
  const PackagesPerPage = 8;

  useEffect(() => {
    const filteredPackages = Packages.filter((Package) =>
      Package.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPackages(filteredPackages);
    setCurrentPage(1);
  }, [searchTerm, Packages]);

  const getCurrentPackages = () => {
    const indexOfLastPackage = currentPage * PackagesPerPage;
    const indexOfFirstPackage = indexOfLastPackage - PackagesPerPage;
    const currentPackages = filteredPackages.slice(
      indexOfFirstPackage,
      indexOfLastPackage
    );
    return currentPackages.length
      ? currentPackages.map((Package) => (
          <AdminPackageCard key={Package._id} Package={Package} />
        ))
      : "No Packages to show";
  };

  const onSearch = (searchString) => {
    setSearchTerm(searchString);
  };

  return (
    <section className="patient-list-conatiner">
      <h2>Packages</h2>
      <Search onSearch={onSearch} placeholder={"Package name"} />
      <div className="patient-list">{getCurrentPackages()}</div>
      <Pagination
        itemsPerPage={PackagesPerPage}
        totalItems={filteredPackages.length}
        paginate={(pageNumber) => setCurrentPage(pageNumber)}
        currentPage={currentPage}
      />
    </section>
  );
};

export default AdminPackageList;
