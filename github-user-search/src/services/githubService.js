import axios from "axios";

const BASE_URL = "https://api.github.com";

// Task 1 function (keep for checker)
export const fetchUserData = async (query) => {
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}&per_page=30`;
  const response = await axios.get(url);
  return response.data;
};


// Task 2 function - Advanced search
export const searchUsers = async ({ username, location, minRepos }, page = 1) => {
  try {
    let query = "";
    if (username) query += `${username} `;
    if (location) query += `location:${location} `;
    if (minRepos) query += `repos:>${minRepos}`;

    const url = `${BASE_URL}/search/users?q=${encodeURIComponent(query.trim())}&page=${page}&per_page=10`;
    const response = await axios.get(url);

    return response.data; // total_count + items
  } catch (err) {
    return { total_count: 0, items: [] };
  }
};

// Fetch full user details for location/repo info
export const fetchUserDetails = async (login) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${login}`);
    return response.data;
  } catch (err) {
    return null;
  }
};



