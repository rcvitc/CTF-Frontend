import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-sm p-8 border border-yellow-400 rounded-lg shadow-lg bg-black">
        <h2 className="text-2xl font-bold text-yellow-400 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2 text-white text-sm">Email</label>
          <input
            type="email"
            className="mb-4 p-2 border border-yellow-400 bg-transparent text-white focus:outline-none focus:border-yellow-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="mb-2 text-white text-sm">Password</label>
          <input
            type="password"
            className="mb-4 p-2 border border-yellow-400 bg-transparent text-white focus:outline-none focus:border-yellow-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-yellow-400 text-black font-bold py-2 mt-2 hover:bg-yellow-200 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-white mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-yellow-400 underline hover:text-yellow-200">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
