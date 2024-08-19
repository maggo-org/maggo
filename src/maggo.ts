//// @ts-ignore
//import fetch from "./fetchWrapper.js";

// TODO : MEJORAR LOGICA DE CUANDO LA RESPUESTA ES UN APPLICATION/JSON
// TODO : MEJORAR LOGICA DE ERROR / API

interface ApiRequest extends RequestInit {
  body?: any;
}

interface Apiresponse<T = any> {
  detail: Response;
  status: number;
  body: T;
}

export default class Maggo {
  private readonly baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  /**
   * Makes a GET request to the specified URL with the given initialization options.
   *
   * @param input - The URL or request info to send the GET request to. It can be a string, URL, or array of strings.
   * @param init - Optional initialization options for the request, such as headers, method, etc.
   * @returns A promise that resolves to the response data of the expected type T.
   * @throws Will throw an error if the request fails or the response status is not OK.
   */
  async get<T = unknown>(
    input: RequestInfo | URL | string[],
    init?: RequestInit | undefined,
  ) {
    try {
      const url = this.buildUrl(input as string);
      const response = await fetch(url, init);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}.`);
      }

      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error("Error occurred during the request: ", error);
      throw new Error("An error occurred while processing the request.");
    }
  }

  /**
   * Sends a POST request to the specified URL with the provided data and optional initialization settings.
   * @template T - The expected response type.
   * @param {RequestInfo | URL} input - The URL or RequestInfo object representing the target endpoint.
   * @param {object} data - The data to be sent in the body of the POST request.
   * @param {ApiRequest} [init={}] - Optional initialization settings for the request, including headers.
   * @returns {Promise<any>} - A promise that resolves to the response of the POST request.
   * @throws {Error} - Throws an error if the request fails.
   */
  async post<T = unknown>(
    input: RequestInfo | URL,
    data: object,
    init: ApiRequest = {},
  ): Promise<any> {
    try {
      const url = this.buildUrl(input as string);

      const response = await fetch(url, {
        ...init,
        method: "POST",
        headers: this.getHeaders(init),
        body: JSON.stringify(data),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error("Error occurred during the POST request: ", error);
      throw new Error("An error occurred while processing the request.");
    }
  }

  /**
   * Sends a PUT request to the specified URL with the provided data.
   *
   * @param input - The URL or RequestInfo object for the PUT request.
   * @param data - The data to be sent in the body of the PUT request. This will be converted to JSON.
   * @param init - Optional configuration object for the fetch request. It can include headers, mode, etc.
   * @returns A promise that resolves to the response data of the expected type T.
   * @throws Throws an error if the request fails or if there is an issue with handling the response.
   */
  async put<T = unknown>(
    input: RequestInfo | URL,
    data: object,
    init?: ApiRequest,
  ) {
    try {
      const url = this.buildUrl(input as string);
      const response = await fetch(url, {
        ...init,
        method: "PUT",
        headers: this.getHeaders(init),
        body: JSON.stringify(data),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Sends a DELETE request to the specified URL.
   *
   * @param input - The URL or RequestInfo object for the DELETE request.
   * @param init - Optional configuration object for the fetch request. It can include headers, mode, etc.
   * @returns A promise that resolves to the response data of the expected type T.
   * @throws Throws an error if the request fails or if there is an issue with handling the response.
   */
  async delete<T = unknown>(input: RequestInfo | URL, init?: ApiRequest) {
    try {
      const url = this.buildUrl(input as string);
      const response = await fetch(url, {
        ...init,
        method: "DELETE",
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      throw error;
    }
  }

  private buildUrl = (endpoint: string) => {
    return this.baseUrl + endpoint;
  };

  private getHeaders(init?: ApiRequest) {
    return {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    };
  }

  private async handleResponse<T>(response: Response): Promise<Apiresponse<T>> {
    let body: T;

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.startsWith("application/json")) {
        body = (await response.json()) as T;
      } else {
        body = (await response.text()) as unknown as T; // For Response that are not JSON
      }
    } else {
      throw new Error(`Chamada a API deu erro : ${response.status}`);
    }

    const detail = response;
    return { detail, body, status: response.status };
  }
}
