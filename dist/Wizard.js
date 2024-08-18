"use strict";
/* eslint-disable no-useless-catch */
// TODO : MEJORAR LOGICA DE CUANDO LA RESPUESTA ES UN APPLICATION/JSON
// TODO : MEJORAR LOGICA DE ERROR / API
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wizard = void 0;
/**
 * @author Alonso Alan Gabriel
 */
class Wizard {
    constructor(baseUrl) {
        this.buildUrl = (endpoint) => {
            return this.baseUrl + endpoint;
        };
        this.baseUrl = baseUrl;
    }
    /**
     * Makes a GET request to the specified URL with the given initialization options.
     *
     * @template T - The expected response type.
     * @param {RequestInfo | URL} input - The URL or request info to send the GET request to.
     * @param {RequestInit} [init] - Optional initialization options for the request.
     * @returns {Promise<T>} A promise that resolves to the response data of type T.
     * @throws Will throw an error if the request fails or the response status is not ok.
     *
     * @example
     *
     * // Basic GET request - 01
     *
     * let response = await wizard.get('https://api.example.com/data')
     * const data = response.body
     *
     * // Basic GET request - 02
     *
     * wizard.get('https://api.example.com/data')
     *   .then(response => {
     *     console.log('Data received:', response);
     *   })
     *   .catch(error => {
     *     console.error('Error making the request:', error);
     *   });
     *
     * @example
     * // GET request with options
     * const options = {
     *   headers: {
     *     'Content-Type': 'application/json',
     *   },
     * };
     * wizard.get('https://api.example.com/data', options)
     *   .then(response => {
     *     console.log('Data received:', response);
     *   })
     *   .catch(error => {
     *     console.error('Error making the request:', error);
     *   });
     */
    get(input, init) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = this.buildUrl(input);
                const response = yield fetch(url, init);
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}.`);
                }
                return yield this.handleResponse(response);
            }
            catch (error) {
                console.error("Error occurred during the request: ", error);
                throw new Error("An error occurred while processing the request.");
            }
        });
    }
    post(input_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (input, data, init = {}) {
            try {
                const url = this.buildUrl(input);
                const headers = Object.assign({ "Content-Type": "application/json" }, (init.headers || {}));
                const response = yield fetch(url, Object.assign(Object.assign({}, init), { method: "POST", headers, body: JSON.stringify(data) }));
                return yield this.handleResponse(response);
            }
            catch (error) {
                console.error("Error occurred during the POST request: ", error);
                throw new Error("An error occurred while processing the request.");
            }
        });
    }
    postForm(input_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (input, data, init = {}) {
            try {
                const url = this.buildUrl(input);
                const headers = Object.assign({}, (init.headers || {}));
                const response = yield fetch(url, Object.assign(Object.assign({}, init), { method: "POST", headers, body: data }));
                return response;
                //return await this.handleResponse(response)
            }
            catch (error) {
                console.error("Erro na chamada POST: ", error);
                throw error;
            }
        });
    }
    put(input, data, init) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = this.buildUrl(input);
                const response = yield fetch(url, Object.assign(Object.assign({}, init), { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }));
                return yield this.handleResponse(response);
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(input, init) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = this.buildUrl(input);
                const response = yield fetch(url, Object.assign(Object.assign({}, init), { method: "DELETE" }));
                return yield this.handleResponse(response);
            }
            catch (error) {
                throw error;
            }
        });
    }
    handleResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            let body;
            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.startsWith("application/json")) {
                    body = yield response.json();
                }
                else {
                    body = yield response.text();
                }
            }
            else {
                throw new Error(`Chamada a api deu erro : ${response.status}`);
            }
            const detail = response;
            return { detail, body, status: response.status };
        });
    }
}
exports.default = Wizard;
exports.wizard = new Wizard("");
