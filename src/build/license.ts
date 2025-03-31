import * as fs from "node:fs";
import * as path from "node:path";
import { behaviorPackDir, rootDir } from "./paths";

const licensePath = path.join(rootDir, 'LICENSE');
const distPath = path.join(behaviorPackDir, 'LICENSE.txt');

let license = fs.readFileSync(licensePath).toString();
console.log('READING LICENSE');

fs.writeFileSync(distPath, license);
console.log('WRITING LICENSE');