export const generateFinalPrompt = async (prompt: string, keys: string[]) => {
  let finalPrompt = prompt;
  keys.map((key, index) => {
    finalPrompt = finalPrompt.includes("{user_input}")
      ? finalPrompt.replaceAll(`{user_input}`, key)
      : finalPrompt.replaceAll(`{user_input${index + 1}}`, key);
  });
  return finalPrompt;
};
