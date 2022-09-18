import {
	uniqueNamesGenerator,
	Config,
	adjectives,
	animals,
} from "unique-names-generator";

const customConfig: Config = {
	dictionaries: [adjectives, animals],
	separator: "-",
	length: 2,
};

const generateName = () => {
	return uniqueNamesGenerator(customConfig);
};

export default generateName;
