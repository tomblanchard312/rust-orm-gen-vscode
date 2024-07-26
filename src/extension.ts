import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

// Create an output channel for logging
const outputChannel = vscode.window.createOutputChannel('Rust ORM Generator');

export function activate(context: vscode.ExtensionContext) {
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

            exec(command, (error, stdout, stderr) => {
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
        } else {
            vscode.window.showErrorMessage('No workspace folder found.');
            outputChannel.appendLine('No workspace folder found.');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
