# VoltStore – E-Commerce Product Page

VoltStore is a responsive front-end product page for Aura Pro wireless headphones, built with HTML, CSS, and vanilla JavaScript as part of my internship project with **Saiket Systems**.

## Features

- **Product gallery:** Switch between product images using thumbnails.
- **Colour variants:** Select different product colours and update the product view.
- **Quantity control:** Increase or decrease the quantity before adding an item to the cart.
- **Shopping cart:** Add items, update quantities, remove items, and clear the cart.
- **Live cart updates:** Keep the cart drawer, header item count, and subtotal in sync.
- **Product details:** Browse product descriptions, specifications, and reviews using tabs.
- **Ratings breakdown:** View a structured breakdown of customer ratings.
- **Wishlist:** Toggle the wishlist option.
- **Delivery check:** Validate the format of a delivery pincode and show an estimated delivery date.
- **Local storage:** Save cart contents in the browser.
- **Responsive layout:** Adapt the page to different screen sizes.
- **Reduced-motion support:** Respect users' reduced-motion preferences.

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JavaScript)
- Browser Local Storage

## Project Structure

```text
saiket-voltstore-ecommerce/
├── index.html
├── style.css
├── script.js
└── README.md
```

| File | Purpose |
| --- | --- |
| `index.html` | Product page structure and content |
| `style.css` | Styling, layout, and responsive design |
| `script.js` | Product gallery, controls, tabs, wishlist, and cart behavior |
| `README.md` | Project overview and setup instructions |

## Run Locally

1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` in a web browser.

No dependencies or build steps are required.

## Key Learning

One of the main challenges was keeping the cart state synchronised across the product page, cart drawer, and header cart count. Working on this helped me practise JavaScript event handling, DOM manipulation, and saving data with browser Local Storage.

## Demo Limitations

- This is a front-end demonstration; checkout is not connected to a payment gateway or order service.
- The pincode check validates the input format only and does not confirm live delivery availability.
- Cart contents are saved in the browser's local storage.

## Internship Project

**Organization:** Saiket Systems  
**Project:** VoltStore – E-Commerce Product Page

## Author

**Shaik Faisal**

- GitHub: https://github.com/faisalshaik78
- LinkedIn: https://www.linkedin.com/in/shaik-faisal-0176b9228

---

*Created as a learning project to practise front-end web development.*
