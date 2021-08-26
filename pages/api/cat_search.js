const catSearchHandler = async (req, res) => {
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

	res.status(200).json(catsSearched.map(({ name }) => name));
};

export default catSearchHandler;
