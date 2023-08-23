const { execSync } = require("child_process"); // Execute shell commands synchronously
const fs = require("fs"); // used to manipulate files and directories
const executeJava = (req, res) => {
  const { code } = req.body;

  try {
    // Create a temporary .java file and write the code to it
    fs.writeFileSync("ExecuteCode.java", code);

    // Compile the .java file using javac command
    execSync("javac ExecuteCode.java");

    // Execute the compiled .class file using java command
    const output = execSync("java ExecuteCode");

    res.json({ consoleOutput: output.toString() });

    // Clean up the temporary files
    fs.unlinkSync("ExecuteCode.java");
    fs.unlinkSync("ExecuteCode.class");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { executeJava };

// SECURITY ISSUE: Must validate and sanitize user input to avoid code injection
