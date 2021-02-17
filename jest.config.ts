export default {
	transformIgnorePatterns: ["<roodDir>/node_modules/(?!@faramo.zayw)"],
	coverageDirectory: "coverage",
	clearMocks: true,
	testEnvironment: "jest-environment-jsdom-fifteen",
	testPathIgnorePatterns: ["/node_modules/", "/stories/"],
	setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
	testMatch: ["**/*.(spec|test).(js|jsx|ts|tsx)"],
};
