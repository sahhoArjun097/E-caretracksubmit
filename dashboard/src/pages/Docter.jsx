import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../main";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [visibleDoctors, setVisibleDoctors] = useState(8); // Number of initially visible doctors
  const { isAuthenticated } = useContext(Context);

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/user/docters`,
        { withCredentials: true }
      );
      setDoctors(data.docs);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
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
          Access denied. Please log in as an admin to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-52 p-10   bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-blue-900">
          Doctors Information
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.slice(0, visibleDoctors).map((doctor) => (
            <div
              key={doctor._id}
              className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-full h-56">
                <img
                  src={doctor.docAvatar.url}
                  alt={`${doctor.firstName} ${doctor.lastName}`}
                  className="w-full h-full object-cover rounded-lg mb-4"
                />
              </div>
              <h2 className="text-lg font-semibold">
                {doctor.firstName} {doctor.lastName}
              </h2>
              <p className="text-gray-600">
                <strong>Department:</strong> {doctor.docterDepartment}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {doctor.email}
              </p>
              <p className="text-gray-600">
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
