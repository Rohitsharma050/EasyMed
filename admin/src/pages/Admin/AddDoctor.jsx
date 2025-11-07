import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const { backendUrl, token } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        toast.error("Image not selected");
        return;
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.append("about", about);

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="mt-20 mb-5 md:ml-50 px-4 sm:px-6 md:px-10 w-full flex justify-center"
    >
      <div className="w-full max-w-4xl bg-white shadow-sm rounded-lg border border-gray-200 p-6 sm:p-8">
        {/* Header */}
        <p className="mb-6 text-2xl font-semibold border-b pb-3 border-gray-300 text-gray-800">
          Add Doctor
        </p>

        {/* Image Upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-600">
          <label htmlFor="doc-image" className="cursor-pointer">
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover bg-gray-100 rounded-full"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-image"
            hidden
          />
          <p className="text-sm sm:text-base">
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Two Column Form (Responsive) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-700">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <div>
              <p>Doctor Name</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div>
              <p>Doctor Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <p>Doctor Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div>
              <p>Experience</p>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>
                    {i + 1} Year
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>Fees</p>
              <input
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <div>
              <p>Speciality</p>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Gynecologist">Gynecologist</option>
                <option value=" physician"> physician</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p>Education</p>
              <input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="text"
                placeholder="Education"
              />
            </div>

            <div>
              <p>Address</p>
              <input
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                type="text"
                placeholder="Address 1"
                required
              />
              <input
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="text"
                placeholder="Address 2"
                required
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6">
          <p className="mb-2">About Doctor</p>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded resize-none"
            placeholder="Write about doctor..."
            rows={5}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center sm:justify-end">
          <button
            className="bg-[#5f6FFF] px-10 py-3 mt-6 text-white rounded-full hover:bg-[#4c59e0] transition-all duration-300"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
