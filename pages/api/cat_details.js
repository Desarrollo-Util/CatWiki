const catDetailsHandler = async (req, res) => {
	if (!req.query.q) return res.status(400).send('Missing query parameter q');

	const searchQueryParam = req.query.q;

	const catsResponse = await fetch(
		`https://api.thecatapi.com/v1/breeds/search?q=${searchQueryParam}`,
		{
			method: 'GET',
			headers: {
				'x-api-key': process.env.CATAPI_KEY,
			},
		}
	);

	if (catsResponse.status !== 200)
		return res.status(catsResponse.status).send(catsResponse.statusText);

	const catsSearched = await catsResponse.json();

	if (catsSearched.length === 0)
		return res.status(404).send(`${searchQueryParam} breed not found`);
	if (catsSearched.length > 1)
		return res.status(500).send(`${searchQueryParam} breed not unique`);

	const {
		id,
		description,
		temperament,
		origin,
		life_span,
		adaptability,
		affection_level,
		child_friendly,
		grooming,
		intelligence,
		health_issues,
		social_needs,
		stranger_friendly,
	} = catsSearched[0];

	res.status(200).json({
		id,
		description,
		temperament,
		origin,
		life_span,
		adaptability,
		affection_level,
		child_friendly,
		grooming,
		intelligence,
		health_issues,
		social_needs,
		stranger_friendly,
	});
};

export default catDetailsHandler;
