import React, { useState, useEffect } from "react";
import admin from "../assets/Vector.png";
import { ThreeDots } from "react-loader-spinner";


const Settings = () => {
  const [profileImage, setProfileImage] = useState(admin);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Female",
  });
  const [errors, setErrors] = useState({});
  const [isLoader, setIsLoader] = useState(true);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is Required";
    if (!formData.email.trim()) newErrors.email = "E-mail is Required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is Required";
    if (!formData.dob.trim()) newErrors.dob = "Date of Birth is Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Form Submitted Successfully!");
    }
  };

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setIsLoader(false);
      }, 1000);
    }, []);
  
    if (isLoader) {
      return (
        <div className="flex justify-center items-center h-screen">
          <ThreeDots
            height="80"
            width="80"
            color="#0857A3"
            ariaLabel="loading"
          />
        </div>
      );
    }
  return (
    <div className="ml-[250px]">
      <div className="px-2 lg:pl-2 xl:px-3">
        <h1 className="text-[#0857A3] font-bold text-3xl lg:text-4xl">Settings</h1>
        <h3 className="text-[#1E293B] font-bold text-xl lg:text-2xl mt-1">Settings</h3>
        <div className="flex justify-center items-center bg-gray-100">
          <div className="w-full max-w-[1010px] my-4 p-4 bg-white rounded-lg shadow-sm flex flex-col items-center">
            <div className="flex flex-col items-center">
              <img
                src={profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-full mb-2 object-cover"
              />
              <label className="text-[#4379EE] text-sm font-semibold cursor-pointer">
                Edit Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>

            {/* Responsive Form Fields */}
            <div className="flex flex-wrap justify-between mt-5 w-full max-w-[90%]">
              {[
                { label: "First Name", name: "firstName", placeholder: "Sean" },
                { label: "Last Name", name: "lastName", placeholder: "Dennis" },
                { label: "Your email", name: "email", placeholder: "Seandennis@yahoo.com", type: "email" },
                { label: "Phone Number", name: "phone", placeholder: "546-933-2772" },
                { label: "Date of Birth", name: "dob", placeholder: "11-08-1995" },
              ].map((field, index) => (
                <div className="w-full md:w-[48%] mb-4" key={index}>
                  <label className="block text-[#1E293B] font-semibold text-sm mb-1">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full h-[38px] bg-[#F5F6FA] border border-[#D5D5D5] rounded-md px-3"
                    placeholder={field.placeholder}
                  />
                  {errors[field.name] && (
                    <span className="text-red-500 text-xs">{errors[field.name]}</span>
                  )}
                </div>
              ))}
              <div className="w-full md:w-[48%] mb-4">
                <label className="block text-[#1E293B] font-semibold text-sm mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full h-[38px] bg-[#F5F6FA] border border-[#D5D5D5] rounded-md px-3"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="w-full flex justify-center mt-10">
              <button
                onClick={handleSubmit}
                className="w-full max-w-[517px] h-[38px] bg-[#0857A3] text-white font-semibold rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
