import css from "./Options.module.css";

const Options = ({ updateFeedback, totalFeedback, resetFeedback }) => {
	return (
		<div>
			<ul className={css.list}>
				<li className={css.item}>
					<button onClick={() => updateFeedback("good")}>Good</button>
				</li>
				<li className={css.item}>
					<button onClick={() => updateFeedback("neutral")}>Neutral</button>
				</li>
				<li className={css.item}>
					<button onClick={() => updateFeedback("bad")}>Bad</button>
				</li>
				{totalFeedback > 0 && (
					<li className={css.item}>
						<button onClick={() => resetFeedback()}>Reset</button>
					</li>
				)}
			</ul>
		</div>
	);
};

export default Options;
