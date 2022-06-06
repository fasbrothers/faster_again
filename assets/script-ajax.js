//   let cart_1 = document.querySelector('.cart');
//   let addButton = document.querySelector('.product__button');
//   let cartTotal = document.querySelector(".cart__footer-total")

//   cartMain.addEventListener("click", (e)=>{
//   if(e.target.classList.contains("cart__checkout-remove")){
//     let formData = {
//             "id": e.target.getAttribute("data-key"),
//             "quantity": 0,
//   };
//   fetch(window.Shopify.routes.root + 'cart/change.js', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//     body: JSON.stringify(formData)
//   })
//   .then(response => {
//     return response.json();
//   })
//   .then(data=>{
//     cartTotal.textContent = '$' + ((data.total_price) / 100 ).toFixed(2);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   })
//   e.target.parentElement.remove();
//   }
//   if(e.target.classList.contains("btn-increase")){ 

//   }
// })
  
//   function getData(){
//     let result =  fetch(window.Shopify.routes.root + 'cart.js', {
//     method: 'GET',
//   })
//     .then(response => {
//       return response.json();
//     }).then(data => {
//       console.log(data);
//       cartTotal.textContent = '$' + ((data.total_price)/100).toFixed(2);
//       cartMain.innerHTML = "";
//       cartMain.insertAdjacentHTML('afterbegin', data.items.map(item => {
//         return `
//         <div class="cart__checkout">
//           <a href="${item.url}" class="cart__checkout-image">
//             <img
//               src="${item.featured_image.url}"
//               alt="${item.product_title}"
//               class="cart__checkout-img"
//             />
//           </a>
//           <a class="cart__checkout-title" href="${item.url}">${item.title}</a>
//           <p class="cart__checkout-variant">${item.variant_title}</p>
//           <p class="cart__checkout-price">$${(item.final_line_price / 100).toFixed(2)}</p>
//           <button
//               class="cart__checkout-remove"
//               data-key="${item.key}"
//             >
//               {% render "remove" %} 
//             </button>
//           <div class="cart__checkout-quantity">
//           <button class="btn-decrease">{% render "minus" %}</button>
//             <input 
//               type="text"
//               id="${item.key}"
//               value="${item.quantity}"
//               class= "cart__checkout-input"
//             />
//             <button class="btn-increase">{% render "plus" %}</button>       
//           </div>
//         </div>
//         `
//       }).join(''));
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
//     return result;
//   }


// function postData (){
//   let addToCartForm = document.querySelector('form[action$="/cart/add"]');
//   let formData = new FormData(addToCartForm);
//   return fetch(window.Shopify.routes.root + 'cart/add.js', {
//     method: 'POST',
//     body: formData
//   })
//   .then(response => {
//     return getData();
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   }); 
// }
//     addButton.addEventListener("click", (e)=>{
//     e.preventDefault();
//     cart_1.classList.add("cart__open");
//     postData();
//   });

