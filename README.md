# RUST ORM GEN Extension for VS Code

To use rust_orm_gen as a Visual Studio Code extension, follow these steps:

Install the Extension:

Install the rust-orm-generator-0.0.1.vsix

Open the Extensions view in VSCode (Ctrl+Shift+X) and search for Rust ORM Generator. Install the extension.

Set Up Your Project:

Ensure your Rust project is set up with a valid Cargo.toml file and the necessary dependencies.

Configure the Extension:

Ensure rust_orm_gen is built and available in your project's target/release directory.

Generate ORM Files:

Open the command palette (Ctrl+Shift+P) and run Generate Rust ORM. This will execute the rust_orm_gen command with the specified database URL and output directory.

## Requirements

- Rust and Cargo must be installed on your system and available in your PATH.
- An active PostgreSQL database to connect to.

## Usage

1. Open your Rust project in VS Code.
2. Run the "Generate Rust ORM" command from the Command Palette (Ctrl+Shift+P or Cmd+Shift+P on macOS).
3. Enter your PostgreSQL connection string when prompted.
4. The ORM files will be generated in a `db` folder in your project root.

Note: If this is your first time using the extension, it may take a moment to install the Rust ORM Generator tool.
