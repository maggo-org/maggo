var fetch;
if (typeof window === "undefined") {
  fetch = require("node-fetch");
} else {
  fetch = window.fetch;
}

export default fetch;
