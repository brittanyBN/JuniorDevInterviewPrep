const { execSync } = require("child_process");
const fs = require("fs");

const executeCSharp = (req, res) => {
  const { code } = req.body;

  try {
    // Create a temporary .cs file and write the code to it
    fs.writeFileSync("ExecuteCode.cs", code);

    // Execute the .cs file using dotnet-script command
    const output = execSync("dotnet-script ExecuteCode.cs");

    res.json({ consoleOutput: output.toString() });

    // Clean up the temporary file
    fs.unlinkSync("ExecuteCode.cs");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { executeCSharp };
