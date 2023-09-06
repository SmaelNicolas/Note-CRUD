import "./select.css";

export const Select = ({ handleSelect, notes }) => {
	let options = [];
	const categories = notes.map((note) => note.categories);
	categories.forEach((cat) => {
		cat.forEach((name) => options.push(name));
	});
	const categoriesClean = [...new Set(options)];

	return (
		<select className="select" onChange={handleSelect}>
			<>
				<option className="option" value="all">
					All
				</option>
				{categoriesClean?.map((cat) => (
					<option key={cat} value={cat} className="option">
						{cat}
					</option>
				))}
			</>
		</select>
	);
};
