import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Context } from "../main";
// import DocterDetail from "../components/DocterDetail";


const Doctor = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [visibleDoctors, setVisibleDoctors] = useState(6); // Number of initially visible doctors
  const { isAuthenticated } = useContext(Context);

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/user/docters`,
        { withCredentials: true }
      );
      setDoctors(data.docs);
      console.log(data.docs)
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  const handleDocterDetails = (doctor) => {
    navigate(`/doctor/${doctor._id}`, { state: { doctor } });
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const loadMoreDoctors = () => {
    setVisibleDoctors((prev) => prev + 8); // Show 8 more doctors on each click
  };



  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-slate-700 flex justify-center items-center">
        <p className="text-xl font-semibold text-red-500">
          Access denied. Please log in as an Aatient to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 bg-gradient-to-b  from-blue-100 via-purple-100 to-pink-100  flex justify-center it  p-20">
      <div className="w-full max-w-8xl rounded-lg   p-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-blue-900 text-center">
          Doctors Information
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {doctors.slice(0, visibleDoctors).map((doctor) => (
            <div
            key={doctor._id}
            onClick={() => handleDocterDetails(doctor)}
              className="border rounded-lg p-6 shadow-md bg-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-full h-56 mb-4">
                <img
                  src={doctor.docAvatar.url}
                  alt={`${doctor.firstName} ${doctor.lastName}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                {doctor.firstName} {doctor.lastName}
              </h2>
              <p className="text-gray-700 mb-1">
                <strong>Department:</strong> {doctor.docterDepartment}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Email:</strong> {doctor.email}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {doctor.phone}
              </p>
            </div>
          ))}
        </div>
        {visibleDoctors < doctors.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreDoctors}
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctor;
