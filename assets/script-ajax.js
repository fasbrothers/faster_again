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

// function to remove the product from the cart, and update the cart qunatity
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
// function to remove the product from the cart
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
          totalValue +=
            element.original_price * element.quantity - element.total_discount;
        } else if (element.properties._bundle_price) {
          totalValue += element.properties._bundle_price * element.quantity;
        } else {
          totalValue +=
            element.original_price * element.quantity - element.total_discount;
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
// function to update the cart quantity
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
            totalValue +=
              element.original_price * element.quantity -
              element.total_discount;
          } else if (element.properties._bundle_price) {
            totalValue += element.properties._bundle_price * element.quantity;
          } else {
            totalValue +=
              element.original_price * element.quantity -
              element.total_discount;
          }
        });
        document.querySelector(".cart__footer-total").textContent = `$${(
          totalValue / 100
        ).toFixed(2)}`;
        let current = changed.items.find((item) => item.key === key);

        if (quantity <= current.quantity) {
          if (symbol === "+") {
            select.previousElementSibling.textContent = quantity;
            getData();
          } else {
            select.nextElementSibling.textContent = quantity;
            getData();
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

document.querySelector(".cart").addEventListener("change", () => {
  getData();
});
