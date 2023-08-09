import { CodeChallengeButton } from "./CodeChallengeButton";
import React from "react";

export const HelpButtons = ({ codeChallenges, currentCodeChallengeIndex }) => {
  return (
    <div className="help-buttons">
      <div className="button">
        {codeChallenges.length > 0 ? (
          <CodeChallengeButton
            hint={codeChallenges[currentCodeChallengeIndex].hint}
          >
            Hint
          </CodeChallengeButton>
        ) : (
          <h2>No hint :(</h2>
        )}
      </div>
      <div className="button">
        {codeChallenges.length > 0 ? (
          <CodeChallengeButton
            solution={codeChallenges[currentCodeChallengeIndex].solution}
          >
            Solution
          </CodeChallengeButton>
        ) : (
          <h2>No solution :(</h2>
        )}
      </div>
      <div className="button">
        {codeChallenges.length > 0 ? (
          <CodeChallengeButton
            betterSolution={
              codeChallenges[currentCodeChallengeIndex].betterSolution
            }
          >
            Best Solution
          </CodeChallengeButton>
        ) : (
          <h2>No better solution :(</h2>
        )}
      </div>
    </div>
  );
};
