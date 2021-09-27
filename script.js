async function fetchCountries(search) {
  const response = await fetch(
    "http://localhost:666/countries?search=" + search
  );
  const data = await response.json();
  return data;
}
function debounce(callback, ms = 250) {
  let timeout;
  return args => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(args);
    }, ms);
  };
}
function autoComplete(inputNode, callback) {
  let isListWrapper = true;
  inputNode.addEventListener("input", inputEvent => {
    const { value: search } = inputEvent.target;
    if (!isListWrapper) {
    }
  });
  inputNode.addEventListener("blur", blurEvent => {
    console.log("Blur input");
    callback(blurEvent);
  });
}
const debouncedFetchCountries = debounce(fetchCountries);

document.addEventListener("DOMContentLoaded", async event => {
  const autocompleteInput = document.getElementById("autocomplete");
  autoComplete(autocompleteInput, e => {
    console.log(e);
  });
});
