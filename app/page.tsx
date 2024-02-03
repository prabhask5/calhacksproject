"use client"

import Script from "next/script";
import { useEffect, useState } from "react";
import 'flowbite';
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

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

  const toastClassState = !showToast ? " opacity-0 ease-in-out": " opacity-1 ease-in-out";

  useEffect(() => {
    if (showToast) setTimeout(() => setShowToast(false), 3000);
  }, [showToast])

  const handleSubmit = () => {
    const formData = {
      name,
      university,
      major,
      gradDate,
      gender,
      country,
      essay,
      is18,
    }
    console.log(formData);

    setShowToast(true);

    setName("");
    setUniversity("");
    setMajor("");
    setGradDate("");
    setGender("");
    setCountry("");
    setEssay("");
    setIs18(false);
  };

  return (
  <>
    <form onSubmit={e => {
      e.preventDefault();
      handleSubmit();
    }} className="max-w-sm mx-auto my-6">
      <div className="mb-5">
        <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">Full name</label>
        <input type="text" id="fullname" value={name} onChange={e => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <div className="mb-5">
        <label htmlFor="university" className="block mb-2 text-sm font-medium text-gray-900">University</label>
        <input type="text" id="university" value={university} onChange={e => setUniversity(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      </div>
      <div className="mb-5">
        <label htmlFor="major" className="block mb-2 text-sm font-medium text-gray-900">Major</label>
        <input type="text" id="major" value={major} onChange={e => setMajor(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      </div>
      <div className="mb-5">
        <label htmlFor="gradDate" className="block mb-2 text-sm font-medium text-gray-900">Graduation date</label>
        <input type="text" id="gradDate" value={gradDate} onChange={e => setGradDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      </div>
      <div className="mb-5">
        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
        <select id="gender" value={gender} onChange={e => setGender(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option value="" disabled>Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="nonbinary">Nonbinary</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-5">
        <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">Country of residence</label>
        <input type="text" id="country" value={country} onChange={e => setCountry(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="resume">Upload resume</label>
        <input accept="application/pdf" onChange={e => setResume(e.target.files ? e.target.files[0]: null)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="resume" type="file"/>
        {resume && <div className="mt-1 cursor-pointer text-sm hover:underline text-gray-500" onClick={() => window.open(URL.createObjectURL(resume), "_blank")}>Click to preview file</div>}
      </div>
      <div className="mb-5">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Why are you interested in attending Cal Hacks 11.0? What are you interested in
building? (1000 character maximum):</label>
        <textarea value={essay} onChange={e => setEssay(e.target.value)}  id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
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
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <HiCheck className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">Form successfully submitted.</div>
      <Toast.Toggle onDismiss={() => setShowToast(false)}/>
    </Toast>
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></Script>
  </>
  );
}
