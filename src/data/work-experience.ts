import type { WorkExperience } from "~/models/work-experience";

export const workExperiences: WorkExperience[] = [
	{
		company: "PT. Koneksi Strategis Indonesia",
		position: "Java Developer",
		type: "onsite",
		time: "full-time",
		period: [new Date(2024, 8), null],
		details: [
			"Implemented multi-threading on process system",
			"Collaborated with senior developers to create code according to predetermined standards",
			"Utilized Java architecture knowledge to optimize system performance",
		],
		technologies: ["Java", "Oracle", "MySQL", "Redis", "docker"],
	},
	{
		company: "Private Company",
		position: "Backend Developer",
		type: "remote",
		time: "freelance",
		period: [new Date(2024, 2), null],
		details: [
			"Integrated the system with WhatsApp meta for enhanced functionality",
			"Participated in team meetings and discussions to brainstorm ideas for system improvement",
			"Successfully optimized code execution time from 1700ms to 100ms, achieving a 94% performance improvement through code refactoring and efficient algorithm implementation.",
		],
		technologies: ["Typescript", "Nest JS", "Postgresql", "Mongodb", "Docker", "Laravel"],
	},
	{
		company: "Olahkarsa",
		position: "Fullstack Web Developer",
		type: "remote",
		time: "freelance",
		period: [new Date(2024, 3), new Date(2024, 6)],
		details: [
			"Developed a comprehensive reporting system to meet internal employee needs and enhancing data accessibility.a",
			"Implemented Single Sign-On (SSO) functionality using Laravel to streamline user authentication and improve security across multiple applications.",
		],
		technologies: ["PHP", "Laravel", "MySQL"],
	},
	{
		company: "PT. Zona Karya Nusantara",
		position: "Fullstack Web Developer",
		type: "onsite",
		time: "contract",
		period: [new Date(2023, 10), new Date(2024, 1)],
		details: [
			"Collaborated with cross-functional teams to develop systems that meet user expectations and business objectives",
			"Participated in regular stand-ups and sprint planning meetings to track progress and prioritize tasks",
			"Utilized Laravel to design and build frontend and backend systems",
		],
		technologies: ["PHP", "Laravel", "MySQL", "Ubuntu", "Ajax"],
	},
	{
		company: "Elux Space",
		position: "Backend Developer",
		type: "onsite",
		time: "contract",
		period: [new Date(2023, 4), new Date(2023, 10)],
		details: [
			"Applied agile development methodologies to adapt quickly to changing project requirements and deliver iterative improvements",
			"Actively participated in bug resolution activities, identifying and troubleshooting issues promptly to maintain the stability of the Kendali App.",
			"Implemented best practices for Laravel API development to optimize system performance and ensure the security of user data.",
		],
		technologies: ["Laravel", "PHP", "MySQL", "Rest API"],
	},
	{
		company: "DOT Indonesia",
		position: "Backend Developer",
		type: "onsite",
		time: "internship",
		period: [new Date(2023, 1), new Date(2023, 8)],
		details: [
			"Engaged in the DPR Revamp and Sniper DPR project, contributing to the development and enhancement of backend functionalities using the Laravel framework.",
			"Utilized agile development methodologies to streamline project workflows, enhance collaboration, and deliver high-quality solutions.",
			"Gained proficiency in Laravel best practices, coding standards, and version control systems.",
		],
		technologies: ["Laravel", "PHP", "MySQL", "Rest API", "Nest JS"],
	},
];
