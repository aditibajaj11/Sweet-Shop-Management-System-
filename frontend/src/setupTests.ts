// Polyfills and test setup for Jest + React Testing Library
// Provide TextEncoder/TextDecoder for libraries that expect them (react-router, etc.)
import "@testing-library/jest-dom";

// Node's util has TextEncoder/TextDecoder in modern Node versions
// Use require so this file works when ts-jest runs in different module modes
const util = require("util");
const TextEncoder = util.TextEncoder;
const TextDecoder = util.TextDecoder;

if (typeof (global as any).TextEncoder === "undefined") {
	(global as any).TextEncoder = TextEncoder;
}

if (typeof (global as any).TextDecoder === "undefined") {
	(global as any).TextDecoder = TextDecoder;
}

// Let React Testing Library know we're in an environment that supports act
// so async updates are handled properly in tests
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;


