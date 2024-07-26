"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
// Create an output channel for logging
const outputChannel = vscode.window.createOutputChannel('Rust ORM Generator');
function activate(context) {
    let disposable = vscode.commands.registerCommand('rust-orm-gen.generateORM', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders) {
            const rootPath = workspaceFolders[0].uri.fsPath;
            const dbUrl = "postgres://postgres:password@localhost:5432/mydb";
            const outputPath = path.join(rootPath, 'db');
            const rustOrmGenPath = path.join(rootPath, 'target', 'release', 'rust_orm_gen');
            const command = `"${rustOrmGenPath}" "${dbUrl}" "${outputPath}"`;
            outputChannel.show(true);
            outputChannel.appendLine(`Executing command: ${command}`);
            (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                if (error) {
                    vscode.window.showErrorMessage(`Failed to generate ORM files: ${error.message}`);
                    outputChannel.appendLine(`Error: ${error.message}`);
                    outputChannel.appendLine(`stderr: ${stderr}`);
                    return;
                }
                vscode.window.showInformationMessage('ORM files generated successfully');
                outputChannel.appendLine('ORM files generated successfully');
                outputChannel.appendLine(`stdout: ${stdout}`);
            });
        }
        else {
            vscode.window.showErrorMessage('No workspace folder found.');
            outputChannel.appendLine('No workspace folder found.');
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map