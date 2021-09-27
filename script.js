async function fetchCountries(search) {
  const response = await fetch(
    "http://localhost:666/countries?search=" + search
  );
  const data = await response.json();
  return data;
}
function debounce(callback, ms = 250) {
  let timeout;
  let data = null;
  function callbackDebounced(args) {
    clearTimeout(timeout);
    return new Promise(resolve => {
      timeout = setTimeout(() => {
        data = callback(args);
        if (data) resolve(data);
        else console.error(new Error(data));
      }, ms);
    });
  }
  return callbackDebounced;
}
const debouncedFetchCountries = debounce(fetchCountries);
function autoComplete(inputNode, callback) {
  const autocompleteWrapper = document.querySelector(".autocomplete-wrapper");
  const ul = document.createElement("ul");
  ul.classList.add("list-wrapper");

  let isListWrapper = false;
  inputNode.addEventListener("input", async inputEvent => {
    const { value: search } = inputEvent.target;
    let result = await debouncedFetchCountries(search);
    if (result) {
      const liEmpty = document.createElement("li");
      liEmpty.appendChild(document.createTextNode("Kosong"));
      // liEmpty.classList.add("item-list");
      // liEmpty.classList.add("disabled");
      const liItems = result?.length
        ? result?.map((country, index) => {
            const countryNameNode = document.createTextNode(country.name);
            const li = document.createElement("li");
            li.classList.add("item-list");
            li.dataset.listItem = "item-" + (index + 1);
            li.appendChild(countryNameNode);
            return li;
          })
        : [liEmpty];
      ul.replaceChildren(...liItems);
      if (!isListWrapper) {
        autocompleteWrapper.appendChild(ul);
        isListWrapper = true;
      }
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
