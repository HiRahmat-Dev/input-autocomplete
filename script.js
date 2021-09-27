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
const debouncedFetchCountries = debounce(fetchCountries);
function autoComplete(inputNode, callback) {
  const autocompleteWrapper = document.querySelector(".autocomplete-wrapper");
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  const exampleText = document.createTextNode("halo");
  ul.classList.add("list-wrapper");
  li.classList.add("item-list");

  let isListWrapper = false;
  inputNode.addEventListener("input", inputEvent => {
    const { value: search } = inputEvent.target;
    const result = debouncedFetchCountries(search);
    if (!isListWrapper) {
      li.appendChild(exampleText);
      ul.appendChild(li);
      autocompleteWrapper.appendChild(ul);
      isListWrapper = true;
    }
  });
  document.addEventListener("click", docEvent => {
    if (isListWrapper) {
      const isListItemClicked = docEvent?.target?.className === "item-list";
      const isOutside = !(
        isListItemClicked || docEvent?.target?.id === "autocomplete"
      );
      if (isOutside) {
        ul.remove();
        isListWrapper = false;
      } else if (isListItemClicked) {
        const value = docEvent?.target?.innerHTML ?? "";
        inputNode.value = value;
        ul.remove();
        isListWrapper = false;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", async event => {
  const autocompleteInput = document.getElementById("autocomplete");
  autoComplete(autocompleteInput, e => {});
});
