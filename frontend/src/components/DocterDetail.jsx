import { useLocation } from "react-router-dom";
import { FaEnvelope, FaPhone, FaIdCard, FaBirthdayCake } from "react-icons/fa";

const departmentDescriptions = {
    Pediatrics:
      "Pediatrics focuses on the health and medical care of infants, children, and adolescents. Pediatricians are trained to handle the unique developmental, physical, and emotional needs of children. They also address issues related to vaccinations, growth monitoring, and childhood illnesses such as asthma and allergies.",
    Orthopedics:
      "Orthopedics specializes in diagnosing, treating, and preventing disorders of the bones, joints, and muscles. Orthopedic specialists treat conditions like fractures, arthritis, spinal deformities, and sports injuries. They often collaborate with physical therapists to aid recovery and improve mobility.",
    Cardiology:
      "Cardiology is the study and treatment of disorders of the heart and blood vessels. Cardiologists diagnose and manage conditions such as heart attacks, arrhythmias, hypertension, and heart failure. They may also recommend lifestyle changes and perform procedures like angioplasty or pacemaker insertion.",
    Neurology:
      "Neurology deals with the diagnosis and treatment of diseases of the brain, spinal cord, and nerves. Neurologists address conditions like epilepsy, strokes, Parkinson’s disease, and multiple sclerosis. They also play a vital role in understanding and managing neurological disorders affecting cognitive and motor functions.",
    Oncology:
      "Oncology is the branch of medicine that specializes in the diagnosis and treatment of cancer. Oncologists focus on different types of cancer, such as breast cancer, lung cancer, and leukemia. Treatments include chemotherapy, radiation therapy, and surgical interventions, with a strong emphasis on patient support and palliative care.",
    Radiology:
      "Radiology uses imaging techniques to diagnose and treat diseases within the body. Radiologists utilize X-rays, MRI, CT scans, and ultrasounds to detect and monitor conditions. Interventional radiology also allows for minimally invasive treatments guided by imaging technology, reducing recovery times for patients.",
  };
  

const DocterDetail = () => {
  const location = useLocation();
  const doctor = location.state?.doctor;

  if (!doctor) {
    return <div>No doctor data found!</div>;
  }

  const departmentDescription =
    departmentDescriptions[doctor.docterDepartment] || "No description available.";

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center bg-gray-50 p-10">
      {/* Left Section - Doctor's Image */}
      <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
        <img
          src={doctor.docAvatar.url}
          alt={`${doctor.firstName} ${doctor.lastName}`}
          className="w-72 h-72 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Right Section - Doctor's Details */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          {doctor.firstName} {doctor.lastName}
        </h1>
        <p className="text-lg">
          <strong>Department:</strong> {doctor.docterDepartment}
        </p>
        <p className="text-lg">
          <FaEnvelope className="inline mr-2 text-blue-600" />
          <strong>Email:</strong> {doctor.email}
        </p>
        <p className="text-lg">
          <FaPhone className="inline mr-2 text-green-600" />
          <strong>Phone:</strong> {doctor.phone}
        </p>
        <p className="text-lg">
          <FaIdCard className="inline mr-2 text-gray-600" />
          <strong>NIC:</strong> {doctor.nic}
        </p>
        <p className="text-lg">
          <FaBirthdayCake className="inline mr-2 text-pink-600" />
          <strong>DOB:</strong> {doctor.dob}
        </p>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2 text-purple-900">
             {doctor.docterDepartment}
          </h2>
          <p className="text-gray-700">{departmentDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default DocterDetail;
