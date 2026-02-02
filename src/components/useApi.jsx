import { useState } from "react";
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const getData = async (endpoint) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const postData = async (endpoint, body, optional = false) => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Only set Content-Type if not using FormData
      if (!optional) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(`${endpoint}`, {
        method: "POST",
        headers,
        body: optional ? body : JSON.stringify(body),
      });

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const logOutData = async (endpoint) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token
        },
      });
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const postDataWithOutToken = async (endpoint, body) => {
    console.log("body", body);
    console.log("endpoint", endpoint);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log("response status", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);
    }
  };
  const updateRecord = async (endpoint, body) => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Only set Content-Type if body is NOT FormData
      const isFormData = body instanceof FormData;
      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: isFormData ? body : JSON.stringify(body),
      });

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteData = async (endpoint) => {
    setLoading(true);
    setError(null);
    console.log("endPoint", endpoint);

    try {
      await fetch(`${endpoint}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token
        },
      });
      setLoading(false);
      return true; // Return success response
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const getDataByParams = async (endpoint) => {
    // remove `id`
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return {
    getData,
    updateRecord,
    postData,
    getDataByParams,
    logOutData,
    postDataWithOutToken,
    deleteData,
    loading,
    error,
  };
};
export default useApi;
