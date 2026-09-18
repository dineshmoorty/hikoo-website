"use client";

import { useMemo, useState } from "react";

type Course = {
  name: string;
  category: string;
  technologies: string[];
  description: string;
};

const categories = [
  "All",
  "Software Development",
  "Mobile Development",
  "AI & Data",
  "Cloud & DevOps",
  "Cyber Security",
  "Software Testing",
  "UI/UX & Design",
  "Networking & Infrastructure",
];

const courses: Course[] = [
  {
    name: "Java Full Stack Development",
    category: "Software Development",
    technologies: ["Java", "Spring Boot", "React", "SQL"],
    description:
      "Build modern full-stack applications with Java and popular web technologies.",
  },
  {
    name: "Python Full Stack Development",
    category: "Software Development",
    technologies: ["Python", "Django", "React", "SQL"],
    description:
      "Learn full-stack application development using Python and modern web technologies.",
  },
  {
    name: "MERN Stack",
    category: "Software Development",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    description:
      "Develop complete web applications using the MERN technology stack.",
  },
  {
    name: "MEAN Stack",
    category: "Software Development",
    technologies: ["MongoDB", "Express", "Angular", "Node.js"],
    description:
      "Learn modern full-stack development with the MEAN ecosystem.",
  },
  {
    name: ".NET Full Stack Development",
    category: "Software Development",
    technologies: [".NET", "C#", "ASP.NET", "SQL"],
    description:
      "Create enterprise-ready web applications with the Microsoft technology stack.",
  },
  {
    name: "PHP / Laravel",
    category: "Software Development",
    technologies: ["PHP", "Laravel", "MySQL", "HTML"],
    description:
      "Build dynamic and scalable web applications using PHP and Laravel.",
  },
  {
    name: "Web Development",
    category: "Software Development",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    description:
      "Learn the fundamentals and practical skills needed to build modern websites.",
  },
  {
    name: "Android Development",
    category: "Mobile Development",
    technologies: ["Android", "Kotlin", "Java"],
    description:
      "Learn to create Android applications from fundamentals to practical development.",
  },
  {
    name: "iOS Development",
    category: "Mobile Development",
    technologies: ["Swift", "iOS", "Xcode"],
    description:
      "Build modern iOS applications using Swift and Apple's development tools.",
  },
  {
    name: "Flutter Development",
    category: "Mobile Development",
    technologies: ["Flutter", "Dart", "Firebase"],
    description:
      "Create cross-platform mobile applications with Flutter.",
  },
  {
    name: "React Native",
    category: "Mobile Development",
    technologies: ["React Native", "JavaScript", "TypeScript"],
    description:
      "Build cross-platform mobile applications using React Native.",
  },
  {
    name: "Artificial Intelligence",
    category: "AI & Data",
    technologies: ["Python", "AI", "Data"],
    description:
      "Explore the fundamentals and practical applications of artificial intelligence.",
  },
  {
    name: "Machine Learning",
    category: "AI & Data",
    technologies: ["Python", "ML", "Statistics"],
    description:
      "Learn machine learning concepts, workflows and practical model development.",
  },
  {
    name: "Generative AI",
    category: "AI & Data",
    technologies: ["GenAI", "Python", "LLMs"],
    description:
      "Understand modern generative AI concepts and application development.",
  },
  {
    name: "Data Science",
    category: "AI & Data",
    technologies: ["Python", "Pandas", "SQL", "ML"],
    description:
      "Learn data analysis, visualization and machine learning foundations.",
  },
  {
    name: "Data Analytics",
    category: "AI & Data",
    technologies: ["Python", "SQL", "Excel", "Analytics"],
    description:
      "Turn data into useful insights using practical analytics skills.",
  },
  {
    name: "Power BI",
    category: "AI & Data",
    technologies: ["Power BI", "DAX", "Data"],
    description:
      "Create interactive dashboards and business intelligence reports.",
  },
  {
    name: "AWS",
    category: "Cloud & DevOps",
    technologies: ["AWS", "Cloud", "EC2", "S3"],
    description:
      "Learn essential cloud concepts and AWS services.",
  },
  {
    name: "Microsoft Azure",
    category: "Cloud & DevOps",
    technologies: ["Azure", "Cloud", "DevOps"],
    description:
      "Understand cloud computing and Microsoft Azure services.",
  },
  {
    name: "Cloud Computing",
    category: "Cloud & DevOps",
    technologies: ["Cloud", "AWS", "Azure"],
    description:
      "Build a strong foundation in cloud computing concepts and services.",
  },
  {
    name: "DevOps",
    category: "Cloud & DevOps",
    technologies: ["Git", "Docker", "CI/CD", "Linux"],
    description:
      "Learn modern development and operations practices.",
  },
  {
    name: "Cyber Security",
    category: "Cyber Security",
    technologies: ["Security", "Networking", "Linux"],
    description:
      "Build foundational knowledge of cybersecurity and secure systems.",
  },
  {
    name: "Ethical Hacking",
    category: "Cyber Security",
    technologies: ["Security", "Linux", "Networking"],
    description:
      "Study ethical security concepts and responsible security testing.",
  },
  {
    name: "Network Security",
    category: "Cyber Security",
    technologies: ["Networking", "Security", "Linux"],
    description:
      "Understand security principles for modern networks.",
  },
  {
    name: "Manual Testing",
    category: "Software Testing",
    technologies: ["QA", "Test Cases", "Bug Tracking"],
    description:
      "Learn software quality assurance and manual testing practices.",
  },
  {
    name: "Automation Testing",
    category: "Software Testing",
    technologies: ["Selenium", "Java", "Automation"],
    description:
      "Learn automated testing concepts and practical test automation.",
  },
  {
    name: "API Testing",
    category: "Software Testing",
    technologies: ["REST API", "Postman", "Testing"],
    description:
      "Learn how to test and validate modern web APIs.",
  },
  {
    name: "UI/UX Design",
    category: "UI/UX & Design",
    technologies: ["Figma", "UI", "UX"],
    description:
      "Design clear, usable and modern digital experiences.",
  },
  {
    name: "Figma",
    category: "UI/UX & Design",
    technologies: ["Figma", "UI", "Prototyping"],
    description:
      "Learn interface design, wireframes and prototypes with Figma.",
  },
  {
    name: "CCNA",
    category: "Networking & Infrastructure",
    technologies: ["Networking", "Routing", "Switching"],
    description:
      "Build a foundation in networking concepts, routing and switching.",
  },
  {
    name: "Linux Administration",
    category: "Networking & Infrastructure",
    technologies: ["Linux", "Shell", "Administration"],
    description:
      "Learn Linux fundamentals and system administration concepts.",
  },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses = useMemo(
    () =>
      activeCategory === "All"
        ? courses
        : courses.filter((course) => course.category === activeCategory),
    [activeCategory]
  );

  return (
    <main className="min-h-screen bg-white text-slate-900" >
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50" style={{padding: "20px"}}>
        <div className="mx-auto max-w-full px-6 py-20 text-center lg:px-8" >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500" >
            HIKOO Technology
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Build Skills. Build Your Future.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Industry-focused technology courses designed to help you learn,
            practice and grow.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
              30+ Courses
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
              Industry Focused
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
              Practical Learning
            </span>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="mx-auto max-w-full px-6 py-16 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Learning Programs
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Our Courses
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Choose a technology path that matches your learning and career
            goals.
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Course cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <article
              key={`${course.category}-${course.name}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {course.category}
              </p>

              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                {course.name}
              </h3>

              <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                {course.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {course.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Start Your Technology Journey?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Learn practical skills, build your knowledge and take the next
            step in your technology journey with HIKOO.
          </p>

          <a
            href="/contact"
            className="mt-7 inline-flex rounded-full bg-slate-300 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Get Started
          </a>
        </div>
      </section>
    </main>
  );
}
