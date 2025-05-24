"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Languages: <br></br>Java, Python, C/C++, C#, SQL, JavaScript, HTML, CSS, PHP</li><br></br>
        <li>Frameworks/Tools: <br></br>Docker, GitHub, Kubernetes, Microsoft Power BI, Unity Engine, Power Apps, React.js, MongoDB, MySQL
      </li><br></br>
        <li>Concepts: Cloud Computing, Cryptography, IoT</li>
        
        
      </ul>
      
      
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>HSNC University</li>
        <li>Graduated in 2025</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>IBM Professional Data Science Certifications</li>
        <li>Career Essentials in Data Analysis by Microsoft and Linkedin</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about-image.jpeg" width={500} height={500} alt="Description of image" />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
  I&apos;m a tech enthusiast who writes code by day and debates with my laptop by night&mdash;our relationship is complicated, but we make it work. With a knack for turning caffeine into functional programs, I specialize in solving problems that would make most people question their life choices. Whether it&apos;s debugging, designing, or accidentally creating new bugs to fix later, I approach every challenge with patience, logic, and an emergency stash of snacks. Let&apos;s connect and build something great&mdash;or at least laugh at the absurdity of error messages together!
</p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
