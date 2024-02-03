"use client"

import Script from "next/script";
import { useEffect, useState } from "react";
import 'flowbite';
import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

export default function Home() {

  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [gradDate, setGradDate] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [essay, setEssay] = useState("");
  const [is18, setIs18] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastState, setToastState] = useState<"success" | "failure">("success");

  const [fullNameFieldError, setFullNameFieldError] = useState(false);
  const [universityFieldError, setUniversityFieldError] = useState(false);
  const [majorFieldError, setMajorFieldError] = useState(false);
  const [gradDateFieldError, setGradDateFieldError] = useState(false);
  const [genderFieldError, setGenderFieldError] = useState(false);
  const [countryFieldError, setCountryFieldError] = useState(false);
  const [resumeFieldError, setResumeFieldError] = useState(false);
  const [essayFieldError, setEssayFieldError] = useState(false);

  const validateFullName = () => {
    const pattern = /^[a-z ,.'-]+$/i;
    const valid = name.replace(/\s/g, '') !== "" && pattern.test(name);
    setFullNameFieldError(!valid);
    return valid;
  };

  const validateUniversity = () => {
    const valid = university.replace(/\s/g, '') !== "";
    setUniversityFieldError(!valid);
    return valid;
  };

  const validateMajor = () => {
    const valid = major.replace(/\s/g, '') !== "";
    setMajorFieldError(!valid);
    return valid;
  };

  const validateGradDate = () => {
    const pattern = /^[0-9]*$/;
    const valid = gradDate.replace(/\s/g, '') !== "" && pattern.test(gradDate);
    setGradDateFieldError(!valid);
    return valid;
  };

  const validateGender = () => {
    const valid = ["male", "female", "nonbinary", "other"].includes(gender);
    setGenderFieldError(!valid);
    return valid;
  };

  const validateCountry = () => {
    const valid = country.replace(/\s/g, '') !== "";
    setCountryFieldError(!valid);
    return valid;
  };

  const validateResume = () => {
    const valid = resume != null;
    setResumeFieldError(!valid);
    return valid;
  };

  const validateEssay = () => {
    const valid = essay.replace(/\s/g, '') !== "";
    setEssayFieldError(!valid);
    return valid;
  };

  const validateAll = () => {
    const vfn = validateFullName();
    const vu = validateUniversity();
    const vm = validateMajor();
    const vgd = validateGradDate();
    const vg = validateGender();
    const vc = validateCountry();
    const vr = validateResume();
    const ve = validateEssay();

    return (
        vfn &&
        vu &&
        vm &&
        vgd &&
        vg &&
        vc &&
        vr &&
        ve
    );
  };

  const toastClassState = !showToast ? " opacity-0 ease-in-out cursor-default": " opacity-1 ease-in-out";
  const toastDismissClassState = !showToast ? "cursor-default": "cursor-pointer";
  const toastIconClassState = toastState == "success" ? " bg-green-100 text-green-500": " bg-red-100 text-red-500";
  const textInputBaseState = "border text-sm rounded-lg block w-full p-2.5";
  const validInputAddOnState = " focus:ring-blue-500 focus:border-blue-500 border-gray-300 text-gray-900 bg-gray-50";
  const invalidInputAddOnState = " bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500";
  const fileInputBaseState = "block w-full text-sm border rounded-lg cursor-pointer focus:outline-none";
  const validFileInputAddOnState = " text-gray-900 bg-gray-50";
  const invalidFileInputAddOnState = " bg-red-50 text-red-900";
  const labelBaseState = "block mb-2 text-sm font-medium";
  const validLabelAddOnState = " text-gray-900";
  const invalidLabelAddOnState = " text-red-700";

  useEffect(() => {
    if (showToast) setTimeout(() => setShowToast(false), 3000);
  }, [showToast])

  const handleSubmit = () => {
    const allValid = validateAll();

    if (allValid) {
      const formData = {
        name,
        university,
        major,
        gradDate,
        gender,
        country,
        resume,
        essay,
        is18,
      }
      console.log(formData);

      setToastState("success");
      setShowToast(true);
  
      setName("");
      setUniversity("");
      setMajor("");
      setGradDate("");
      setGender("");
      setCountry("");
      setResume(null);
      (document.getElementById("resume") as HTMLInputElement).value = "";
      setEssay("");
      setIs18(false);
    } else {
      setToastState("failure");
      setShowToast(true);
    }
  };

  return (
  <>
    <form onSubmit={e => {
      e.preventDefault();
      handleSubmit();
    }} className="max-w-sm mx-auto my-6">
      <div className="mb-5">
        <label htmlFor="fullname" className={labelBaseState + (fullNameFieldError ? invalidLabelAddOnState: validLabelAddOnState)}>Full name</label>
        <input type="text" id="fullname" value={name} onChange={e => setName(e.target.value)} onBlur={() => validateAll()} className={textInputBaseState + (fullNameFieldError ? invalidInputAddOnState: validInputAddOnState)} />
      </div>
      <div className="mb-5">
        <label htmlFor="university" className={labelBaseState + (universityFieldError ? invalidLabelAddOnState: validLabelAddOnState)}>University</label>
        <input type="text" id="university" value={university} onChange={e => setUniversity(e.target.value)} onBlur={() => validateAll()} className={textInputBaseState + (universityFieldError ? invalidInputAddOnState: validInputAddOnState)}/>
      </div>
      <div className="mb-5">
        <label htmlFor="major" className={labelBaseState + (majorFieldError ? invalidLabelAddOnState: validLabelAddOnState)}>Major</label>
        <input type="text" id="major" value={major} onChange={e => setMajor(e.target.value)} onBlur={() => validateAll()} className={textInputBaseState + (majorFieldError ? invalidInputAddOnState: validInputAddOnState)}/>
      </div>
      <div className="mb-5">
        <label htmlFor="gradDate" className={labelBaseState + (gradDateFieldError ? invalidLabelAddOnState: validLabelAddOnState)}>Graduation date</label>
        <input type="text" id="gradDate" value={gradDate} onChange={e => setGradDate(e.target.value)} onBlur={() => validateAll()} className={textInputBaseState + (gradDateFieldError ? invalidInputAddOnState: validInputAddOnState)}/>
      </div>
      <div className="mb-5">
        <label htmlFor="gender" className={labelBaseState + (genderFieldError ? invalidLabelAddOnState: validLabelAddOnState)}>Gender</label>
        <select id="gender" value={gender} onChange={e => setGender(e.target.value)} onBlur={() => validateAll()} className={textInputBaseState + (genderFieldError ? invalidInputAddOnState: validInputAddOnState)}>
          <option value="" disabled>Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="nonbinary">Nonbinary</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-5">
        <label htmlFor="country" className={labelBaseState + (countryFieldError ? invalidLabelAddOnState: validLabelAddOnState)}>Country of residence</label>
        <input type="text" id="country" value={country} onChange={e => setCountry(e.target.value)} onBlur={() => validateAll()} className={textInputBaseState + (countryFieldError ? invalidInputAddOnState: validInputAddOnState)}/>
      </div>
      <div className="mb-5">
        <label className={labelBaseState + (resumeFieldError ? invalidLabelAddOnState: validLabelAddOnState)} htmlFor="resume">Upload resume</label>
        <input accept="application/pdf" onChange={e => setResume(e.target.files ? e.target.files[0]: null)} onBlur={() => validateAll()} className={fileInputBaseState + (resumeFieldError ? invalidFileInputAddOnState: validFileInputAddOnState)} id="resume" type="file"/>
        {resume && <div className="mt-1 cursor-pointer text-sm hover:underline text-gray-500" onClick={() => window.open(URL.createObjectURL(resume), "_blank")}>Click to preview file</div>}
      </div>
      <div className="mb-5">
        <label htmlFor="essay" className={labelBaseState + (essayFieldError ? invalidLabelAddOnState: validLabelAddOnState)}>Why are you interested in attending Cal Hacks 11.0? What are you interested in
building? (1000 character maximum):</label>
        <textarea value={essay} onChange={e => setEssay(e.target.value)} onBlur={() => validateAll()} id="essay" rows={4} className={textInputBaseState + (essayFieldError ? invalidInputAddOnState: validInputAddOnState)}></textarea>
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input checked={is18} onChange={e => setIs18(!is18)} id="old" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"/>
        </div>
        <label htmlFor="old" className="ms-2 text-sm font-medium text-gray-900">Are you 18+?</label>
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
    </form>
    <Toast className={"fixed bottom-5 right-5" + toastClassState}>
      <div className={"inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" + toastIconClassState}>
        {toastState == "success" ? <HiCheck className="h-5 w-5" />: <HiX className="h-5 w-5" />}
      </div>
      <div className="ml-3 text-sm font-normal">{toastState == "success" ? "Form successfully submitted.": "Please fix invalid responses."}</div>
      <Toast.Toggle className={toastDismissClassState} onDismiss={() => setShowToast(false)}/>
    </Toast>
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></Script>
  </>
  );
}
