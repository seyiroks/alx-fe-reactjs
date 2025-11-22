import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);

    try {
      const queryParts = [];
      if (username) queryParts.push(`${username} in:login`);
      if (location) queryParts.push(`location:${location}`);
      if (minRepos) queryParts.push(`repos:>=${minRepos}`);
      const query = queryParts.join(" ");

      const data = await fetchUserData(query);
      if (data.items.length === 0) {
        setError("Looks like we cant find the user");
      } else {
        setUsers(data.items);
      }
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          placeholder="Minimum Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded p-4 flex flex-col items-center text-center"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 rounded-full mb-2"
            />
            <h2 className="font-semibold">{user.login}</h2>
            {user.location && <p className="text-sm">{user.location}</p>}
            <p className="text-sm">Repos: {user.public_repos || "N/A"}</p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-blue-500 hover:underline"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
