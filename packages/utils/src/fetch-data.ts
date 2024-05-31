export const fetchData = async (
  url: string,
  method: "POST" | "GET",
  body?: any
) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.log("Failed to fetch data", response);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
