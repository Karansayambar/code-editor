const languageCodeMap = {
  cpp: 54,
  python: 92,
  javascript: 93,
  java: 91,
};

async function getSubmission(tokenId) {
  const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "a405696eadmsh1e6f3e77750724fp161ccdjsnffce10051594",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json(); // 👈 use .json() instead of .text()
    return result; // 👈 return the result JSON
  } catch (error) {
    throw error;
  }
}

export async function makeSubmission({ code, language, callback, stdin }) {
  const url =
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*";

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "a405696eadmsh1e6f3e77750724fp161ccdjsnffce10051594",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language_id: languageCodeMap[language],
      source_code: btoa(code),
      stdin: stdin ? btoa(stdin) : null,
    }),
  };

  try {
    callback({ apiStatus: "loading" });
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("result", result.token);

    const tokenId = result.token;
    let statusCode = 1;
    let apiSubmissionResult;
    while (statusCode === 1 || statusCode === 2) {
      try {
        apiSubmissionResult = await getSubmission(tokenId);
        statusCode = apiSubmissionResult.status.id;
      } catch (error) {
        callback({ apiStatus: "error", message: JSON.stringify(error) });
        return;
      }
    }

    if (apiSubmissionResult) {
      callback({ apiStatus: "success", data: apiSubmissionResult });
    }
  } catch (error) {
    console.log(error);
  }
}
