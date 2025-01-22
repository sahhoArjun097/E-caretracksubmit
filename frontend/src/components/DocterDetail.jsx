import { useLocation } from "react-router-dom";

const DocterDetail = () => {
  const location = useLocation();
  const doctor = location.state?.doctor;
  console.log(doctor)

  if (!doctor) {
    return <div>No doctor data found!</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-10">
      <h1 className="text-4xl font-bold mb-6">{doctor.firstName} {doctor.lastName}</h1>
      <img
        src={doctor.docAvatar.url}
        alt={`${doctor.firstName} ${doctor.lastName}`}
        className="w-64 h-64 object-cover rounded-lg mb-6"
      />
      <p><strong>Department:</strong> {doctor.docterDepartment}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Phone:</strong> {doctor.phone}</p>
      <p><strong>NIC:</strong> {doctor.nic}</p>
    </div>
  );
};

export default DocterDetail;
