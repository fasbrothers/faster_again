document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.querySelector(".cart").classList.remove("cart__open");
  }
});
document
  .querySelector(".cart__header-cancel")
  .addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".cart").classList.remove("cart__open");
  });

document.querySelector(".header__bag").addEventListener("click", () => {
  getData();
  document.querySelector(".cart").classList.add("cart__open");
});

document.querySelector(".cart__main").addEventListener("click", (e) => {
  if (e.target.classList.contains("cart__checkout-remove")) {
    e.preventDefault();
    removeItem(e.target.getAttribute("data-key"), e.target.parentElement);
  } else if (e.target.classList.contains("btn-increase")) {
    updateCartValue("+", e.target);
  } else if (e.target.classList.contains("btn-decrease")) {
    updateCartValue("-", e.target);
  }
});
function removeItem(key, select) {
  let formData = {
    id: key,
    quantity: 0,
  };
  fetch(window.Shopify.routes.root + "cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let totalValue = 0;
      data.items.forEach((element) => {
        if (element.properties == null) {
          totalValue += element.original_price * element.quantity;
        } else if (element.properties._bundle_price) {
          totalValue += element.properties._bundle_price * element.quantity;
        } else {
          totalValue += element.original_price * element.quantity;
        }
      });
      document.querySelector(".cart__footer-total").textContent =
        "$" + (totalValue / 100).toFixed(2);
      select.remove();
      if (!data.item_count) {
        empty_cart();
        return;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function updateCartValue(symbol, select) {
  let item = select.parentElement.parentElement;
  let key = item
    .querySelector(".cart__checkout-remove")
    .getAttribute("data-key");
  let quantity = null;

  if (symbol == "+") {
    quantity = Number(select.previousElementSibling.textContent) + 1;
  } else {
    if (Number(select.nextElementSibling.textContent) > 1) {
      quantity = Number(select.nextElementSibling.textContent) - 1;
    } else {
      removeItem(key, item);
      return;
    }
  }
  let formData = {
    id: key,
    quantity: quantity,
  };
  fetch(window.Shopify.routes.root + "cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      res.json().then((changed) => {
        let totalValue = 0;
        changed.items.forEach((element) => {
          if (element.properties == null) {
            totalValue += element.original_price * element.quantity;
          } else if (element.properties._bundle_price) {
            totalValue += element.properties._bundle_price * element.quantity;
          } else {
            totalValue += element.original_price * element.quantity;
          }
        });
        document.querySelector(".cart__footer-total").textContent = `$${(
          totalValue / 100
        ).toFixed(2)}`;
        let current = changed.items.find((item) => item.key === key);
        if (!changed.item_count) {
          console.log("empty");
          empty_cart();
          return;
        }
        if (quantity <= current.quantity) {
          select.classList.remove("not_allowed");
          if (symbol === "+") {
            select.previousElementSibling.textContent = quantity;
          } else {
            select.nextElementSibling.textContent = quantity;
          }
          item.querySelector(".cart__checkout-price").textContent = `$${(
            current.original_line_price / 100
          ).toFixed(2)}`;
        } else {
          return false;
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function empty_cart() {
  document.querySelector(".cart__main").innerHTML = `
  <div class="empty_cart">
            <p>Your Cart is Empty</p>
            <a href="{{ routes.all_products_collection_url }}">Shop Best Sellers</a>
            </div>
            `;
  return;
}
function getData() {
  let result = fetch(window.Shopify.routes.root + "cart.js", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let totalValue = 0;
      data.items.forEach((element) => {
        if (element.properties == null) {
          totalValue += element.original_price * element.quantity;
        } else if (element.properties._bundle_price) {
          totalValue += element.properties._bundle_price * element.quantity;
        } else {
          totalValue += element.original_price * element.quantity;
        }
      });
      document.querySelector(".cart__main").innerHTML = "";
      document.querySelector(".cart__footer-total").textContent =
        "$" + (totalValue / 100).toFixed(2);
      if (!data.item_count) {
        empty_cart();
        return;
      }
      document.querySelector(".cart__main").insertAdjacentHTML(
        "afterbegin",
        data.items
          .map((item) => {
            console.log(item);
            return `
    <div class="cart__checkout">
      <a href="${item.url}" class="cart__checkout-image">
        <img
          src="${item.featured_image.url}"
          alt="${item.product_title}"
          class="cart__checkout-img"
        />
      </a>
      <a class="cart__checkout-title" href="${item.url}">${item.title}</a>
      <p class="cart__checkout-variant">${item.variant_title}</p>
      <p class="cart__checkout-price">$${
        item.properties == null
          ? (item.final_line_price / 100).toFixed(2)
          : item.properties._bundle_price
          ? (item.properties._bundle_price / 100).toFixed(2)
          : (item.final_line_price / 100).toFixed(2)
      }</p>
      <p class="${
        item.discounts.length !== 0
          ? "cart__checkout-discount"
          : "cart__checkout-discount-none"
      }">${item.discounts.length !== 0 ? item.discounts[0].title : ""}</p>

      <button
          class="cart__checkout-remove"
          data-key="${item.key}"
        >
           X 
        </button>
      <div class="cart__checkout-quantity">
        <button type="button" class="btn-decrease ">-</button>
          <span  class= "cart__checkout-input">${item.quantity}</span>
        <button type="button" class="btn-increase ">+</button>    
      </div>
    </div>
    `;
          })
          .join("")
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return result;
}
