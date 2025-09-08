"use strict";
// This file is intended to be used only in a Node.js context.
/* eslint-disable import/no-nodejs-modules */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSandbox = exports.forceRemove = exports.ensureDirectoryStructureExists = exports.directoryExists = exports.fileExists = exports.writeJsonFile = exports.readJsonFile = exports.writeFile = exports.readFile = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const uuid = __importStar(require("uuid"));
const errors_1 = require("./errors.cjs");
/**
 * Read the file at the given path, assuming its content is encoded as UTF-8.
 *
 * @param filePath - The path to the file.
 * @returns The content of the file.
 * @throws An error with a stack trace if reading fails in any way.
 */
async function readFile(filePath) {
    try {
        return await fs_1.default.promises.readFile(filePath, 'utf8');
    }
    catch (error) {
        throw (0, errors_1.wrapError)(error, `Could not read file '${filePath}'`);
    }
}
exports.readFile = readFile;
/**
 * Write content to the file at the given path, creating the directory structure
 * for the file automatically if necessary.
 *
 * @param filePath - The path to the file.
 * @param content - The new content of the file.
 * @throws An error with a stack trace if writing fails in any way.
 */
async function writeFile(filePath, content) {
    try {
        await fs_1.default.promises.mkdir(path_1.default.dirname(filePath), { recursive: true });
        await fs_1.default.promises.writeFile(filePath, content);
    }
    catch (error) {
        throw (0, errors_1.wrapError)(error, `Could not write file '${filePath}'`);
    }
}
exports.writeFile = writeFile;
/**
 * Read the assumed JSON file at the given path, attempts to parse it, and
 * get the resulting object. Supports a custom parser (in case you want to
 * use the [JSON5](https://www.npmjs.com/package/json5) package instead).
 *
 * @param filePath - The path segments pointing to the JSON file. Will be passed
 * to path.join().
 * @param options - Options to this function.
 * @param options.parser - The parser object to use. Defaults to `JSON`.
 * @param options.parser.parse - A function that parses JSON data.
 * @returns The object corresponding to the parsed JSON file, typed against the
 * struct.
 * @throws An error with a stack trace if reading fails in any way, or if the
 * parsed value is not a plain object.
 */
async function readJsonFile(filePath, { parser = JSON, } = {}) {
    try {
        const content = await fs_1.default.promises.readFile(filePath, 'utf8');
        return parser.parse(content);
    }
    catch (error) {
        throw (0, errors_1.wrapError)(error, `Could not read JSON file '${filePath}'`);
    }
}
exports.readJsonFile = readJsonFile;
/**
 * Attempt to write the given JSON-like value to the file at the given path,
 * creating the directory structure for the file automatically if necessary.
 * Adds a newline to the end of the file. Supports a custom parser (in case you
 * want to use the [JSON5](https://www.npmjs.com/package/json5) package
 * instead).
 *
 * @param filePath - The path to write the JSON file to, including the file
 * itself.
 * @param jsonValue - The JSON-like value to write to the file. Make sure that
 * JSON.stringify can handle it.
 * @param options - The options to this function.
 * @param options.prettify - Whether to format the JSON as it is turned into a
 * string such that it is broken up into separate lines (using 2 spaces as
 * indentation).
 * @param options.stringifier - The stringifier to use. Defaults to `JSON`.
 * @param options.stringifier.stringify - A function that stringifies JSON.
 * @returns The object corresponding to the parsed JSON file, typed against the
 * struct.
 * @throws An error with a stack trace if writing fails in any way.
 */
async function writeJsonFile(filePath, jsonValue, { stringifier = JSON, prettify = false, } = {}) {
    try {
        await fs_1.default.promises.mkdir(path_1.default.dirname(filePath), { recursive: true });
        const json = prettify
            ? stringifier.stringify(jsonValue, null, '  ')
            : stringifier.stringify(jsonValue);
        await fs_1.default.promises.writeFile(filePath, json);
    }
    catch (error) {
        throw (0, errors_1.wrapError)(error, `Could not write JSON file '${filePath}'`);
    }
}
exports.writeJsonFile = writeJsonFile;
/**
 * Test the given path to determine whether it represents a file.
 *
 * @param filePath - The path to a (supposed) file on the filesystem.
 * @returns A promise for true if the file exists or false otherwise.
 * @throws An error with a stack trace if reading fails in any way.
 */
async function fileExists(filePath) {
    try {
        const stats = await fs_1.default.promises.stat(filePath);
        return stats.isFile();
    }
    catch (error) {
        if ((0, errors_1.isErrorWithCode)(error) && error.code === 'ENOENT') {
            return false;
        }
        throw (0, errors_1.wrapError)(error, `Could not determine if file exists '${filePath}'`);
    }
}
exports.fileExists = fileExists;
/**
 * Test the given path to determine whether it represents a directory.
 *
 * @param directoryPath - The path to a (supposed) directory on the filesystem.
 * @returns A promise for true if the file exists or false otherwise.
 * @throws An error with a stack trace if reading fails in any way.
 */
async function directoryExists(directoryPath) {
    try {
        const stats = await fs_1.default.promises.stat(directoryPath);
        return stats.isDirectory();
    }
    catch (error) {
        if ((0, errors_1.isErrorWithCode)(error) && error.code === 'ENOENT') {
            return false;
        }
        throw (0, errors_1.wrapError)(error, `Could not determine if directory exists '${directoryPath}'`);
    }
}
exports.directoryExists = directoryExists;
/**
 * Create the given directory along with any directories leading up to the
 * directory, or do nothing if the directory already exists.
 *
 * @param directoryPath - The path to the desired directory.
 * @throws An error with a stack trace if reading fails in any way.
 */
async function ensureDirectoryStructureExists(directoryPath) {
    try {
        await fs_1.default.promises.mkdir(directoryPath, { recursive: true });
    }
    catch (error) {
        throw (0, errors_1.wrapError)(error, `Could not create directory structure '${directoryPath}'`);
    }
}
exports.ensureDirectoryStructureExists = ensureDirectoryStructureExists;
/**
 * Remove the given file or directory if it exists, or do nothing if it does
 * not.
 *
 * @param entryPath - The path to the file or directory.
 * @throws An error with a stack trace if removal fails in any way.
 */
async function forceRemove(entryPath) {
    try {
        return await fs_1.default.promises.rm(entryPath, {
            recursive: true,
            force: true,
        });
    }
    catch (error) {
        throw (0, errors_1.wrapError)(error, `Could not remove file or directory '${entryPath}'`);
    }
}
exports.forceRemove = forceRemove;
/**
 * Construct a sandbox object which can be used in tests that need temporary
 * access to the filesystem.
 *
 * @param projectName - The name of the project.
 * @returns The sandbox object. This contains a `withinSandbox` function which
 * can be used in tests (see example).
 * @example
 * ```typescript
 * const { withinSandbox } = createSandbox('utils');
 *
 * // ... later ...
 *
 * it('does something with the filesystem', async () => {
 *   await withinSandbox(async ({ directoryPath }) => {
 *     await fs.promises.writeFile(
 *       path.join(directoryPath, 'some-file'),
 *       'some content',
 *       'utf8'
 *     );
 *   })
 * });
 * ```
 */
function createSandbox(projectName) {
    const directoryPath = path_1.default.join(os_1.default.tmpdir(), projectName, uuid.v4());
    return {
        directoryPath,
        async withinSandbox(test) {
            if (await directoryExists(directoryPath)) {
                throw new Error(`${directoryPath} already exists. Cannot continue.`);
            }
            await ensureDirectoryStructureExists(directoryPath);
            try {
                await test({ directoryPath });
            }
            finally {
                await forceRemove(directoryPath);
            }
        },
    };
}
exports.createSandbox = createSandbox;
//# sourceMappingURL=fs.cjs.map