const { createContext, Script } = require("vm");

const executeCode = (req, res) => {
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
      log: (message) => {
        console.log("message", message);
        sandbox.console.log = message;
      },
    },
    executedCode: code,
  };

  const script = new Script(code);
  const context = new createContext(sandbox);
  script.runInContext(context);

  return {
    executedCode: sandbox.executedCode,
    consoleOutput: sandbox.console.log,
  };
};

module.exports = { executeCode };
