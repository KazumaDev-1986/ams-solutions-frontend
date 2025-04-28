import {
  API_BASE_URL,
  API_TIMEOUT,
  API_MAX_RETRIES,
  API_RETRY_DELAY,
} from "../../config/env";
import { ERROR_CODES } from "./errorCodes";

const DEFAULT_TIMEOUT = API_TIMEOUT; // 5 segundos
const DEFAULT_MAX_RETRIES = API_MAX_RETRIES; // 3 Intentos de conexión
const DEFAULT_RETRY_DELAY = API_RETRY_DELAY; // 1 segundo

class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithTimeout = async (
  url,
  options = {},
  timeout = DEFAULT_TIMEOUT
) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === "AbortError") {
      throw new ApiError("Request timeout", 408, ERROR_CODES.TIMEOUT);
    }
    throw error;
  }
};

const retryFetch = async (
  url,
  options = {},
  retries = DEFAULT_MAX_RETRIES,
  delay = DEFAULT_RETRY_DELAY
) => {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetchWithTimeout(url, options);

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          ERROR_CODES.HTTP_ERROR
        );
      }

      return response;
    } catch (error) {
      lastError = error;

      if (error.code === ERROR_CODES.TIMEOUT || error.name === "TypeError") {
        console.log(`Attempt ${i + 1} failed, retrying in ${delay}ms...`);
        await sleep(delay);
        continue;
      }

      throw error;
    }
  }

  throw new ApiError(
    `Failed after ${retries} retries: ${lastError.message}`,
    lastError.status || 500,
    ERROR_CODES.MAX_RETRIES_EXCEEDED
  );
};

export const apiClient = {
  get: async (endpoint, options = {}) => {
    const response = await retryFetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "GET",
    });
    return response.json();
  },

  post: async (endpoint, data, options = {}) => {
    const response = await retryFetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
