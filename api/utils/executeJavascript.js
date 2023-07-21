const { createContext, Script } = require("vm");

const executeJavascript = (req, res) => {
  const { code } = req.body;

  try {
    const result = runCode(code);
    res.json(result);
    console.log("executedCode", result.executedCode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const runCode = (code) => {
  const sandbox = {
    console: {
      log: (...args) => {
        console.log(...args);
        sandbox.console.logOutput.push(args.map(String).join(" "));
      },
      error: (message) => {
        console.error("error", message);
        sandbox.console.error = message;
      },
      logOutput: [],
    },
    executedCode: code,
    myFunction: () => {
      console.log("Executing myFunction");
    },
  };

  try {
    const script = new Script(code);
    const context = new createContext(sandbox);
    script.runInContext(context);
  } catch (error) {
    console.error("Error during code execution:", error);
    throw error;
  }

  return {
    executedCode: sandbox.executedCode,
    consoleOutput: sandbox.console.logOutput,
  };
};

module.exports = { executeJavascript };
