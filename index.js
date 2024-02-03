//{"phone":["is cool","very expensive"],"chair":["good, but broke after month"],"desk":[],"bottle":["so small\n","need bigger size","dgdfgfdfd"]}
// data for test

if (!localStorage.getItem("products")) {
  let productEls = document
    .querySelector("#product")
    .querySelectorAll("option");
  let productsNames = Array.from(productEls).map((product) => product.value);

  let products = {};
  productsNames.forEach((productName) => (products[productName] = []));

  localStorage.setItem("products", JSON.stringify(products));
}

if (window.location.pathname == "/index.html") {
  const submitBtn = document.querySelector("#submit-btn");

  const writeReview = () => {
    let productsFromLS = JSON.parse(localStorage.getItem("products"));
    const chosenProduct = document.querySelector("#product").value;
    const newReview = document.querySelector("#review").value;
    const warning = document.querySelector("#warning");

    if (newReview) {
      warning.innerHTML = "";

      productsFromLS[chosenProduct].push(newReview);

      localStorage.setItem("products", JSON.stringify(productsFromLS));
    } else {
      warning.innerHTML = "The review should not be empty";
      warning.style.color = "red";
    }
  };

  submitBtn.addEventListener("click", writeReview);
}

if (window.location.pathname == "/reviews.html") {
  const innerDiv = document.querySelector(".innerdiv");
  const reviewTemplate = document.querySelector("#review-template").content;
  const chooseBtn = document.querySelector("#choose-btn");

  const removeReview = (nameProduct, id) => {
    let productsFromLS = JSON.parse(localStorage.getItem("products"));
    productsFromLS[nameProduct].splice(id, 1);
    localStorage.setItem("products", JSON.stringify(productsFromLS));

    chooseReview();
  };

  const createReview = (reviewData, nameProduct, id) => {
    let review = reviewTemplate.cloneNode(true);
    review.id = id;

    let name = review.querySelector(".product");
    name.innerHTML = nameProduct;

    let reviewContent = review.querySelector(".review-content");
    reviewContent.innerHTML = reviewData;

    let removeBtn = review.querySelector("#remove-btn");
    removeBtn.addEventListener("click", () => {
      removeReview(nameProduct, id);
    });

    innerDiv.appendChild(review);
  };

  const chooseReview = () => {
    let productsFromLS = JSON.parse(localStorage.getItem("products"));
    const chosenProduct = document.querySelector("#product").value;
    let empty = document.querySelector("#empty");

    innerDiv.replaceChildren([]);
    if (productsFromLS[chosenProduct].length > 0) {
      empty.innerHTML = "";
      productsFromLS[chosenProduct].forEach((review, i) =>
        createReview(review, chosenProduct, i)
      );
    } else {
      empty.innerHTML = "No reviews for this product!(";
    }
  };

  chooseBtn.addEventListener("click", chooseReview);
}
