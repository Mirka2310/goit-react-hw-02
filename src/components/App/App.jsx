import { useEffect, useState } from "react";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import styles from "./App.module.css";


const initFeedback = {
	good: 0,
	neutral: 0,
	bad: 0,
};

function App() {
	const [feedbacks, setFeedback] = useState(() => {
		if (localStorage.getItem("feedbacks")) {
			return JSON.parse(localStorage.getItem("feedbacks"));
		} else {
			return initFeedback;
		}
	});

	const updateFeedback = (feedback) => {
		switch (feedback) {
			case "good":
				setFeedback((prevFeedback) => ({
					...prevFeedback,
					good: prevFeedback.good + 1,
				}));
				break;
			case "neutral":
				setFeedback((prevFeedback) => ({
					...prevFeedback,
					neutral: prevFeedback.neutral + 1,
				}));
				break;
			case "bad":
				setFeedback((prevFeedback) => ({
					...prevFeedback,
					bad: prevFeedback.bad + 1,
				}));
				break;

			default:
				throw new Error("feedback type not found");
		}
	};

	const resetFeedback = () => {
		setFeedback(initFeedback);
	};

	useEffect(() => {
		localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
	}, [feedbacks]);

	const totalFeedback = Object.values(feedbacks).reduce(
		(sum, feedback) => sum + feedback,
		0,
	);

	const positiveFeedbackPercentage =
		totalFeedback > 0
			? Math.round(((feedbacks.good + feedbacks.neutral) / totalFeedback) * 100)
			: 0;

	return (
		<div className={styles.container}>
			<Description />
			<Options
				totalFeedback={totalFeedback}
				updateFeedback={updateFeedback}
				resetFeedback={resetFeedback}
			/>
			{totalFeedback > 0 ? (
				<Feedback
					feedbacks={feedbacks}
					totalFeedback={totalFeedback}
					positiveFeedbackPercentage={positiveFeedbackPercentage}
				/>
			) : (
				<Notification />
			)}
		</div>
	);
}

export default App;
