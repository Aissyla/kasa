import AboutBanner from "../components/AboutBanner";
import Collapse from "../components/Collapse";
import aboutArray from "../components/aboutArray.json"; // fichier JSON avec les données des collapses

export default function About() {
	return (
		<>
			<AboutBanner />
			{aboutArray.map((rule, id) => (
				<Collapse
					key={id}
					aboutTitle={rule.aboutTitle}
					aboutText={rule.aboutText}
					aboutStyle="about-style"
				/>
			))}
		</>
	);
}