# EcoMart 🌱 | Static E-Commerce Website Prototype (Academic Coursework)

> **Academic Notice:** This project is a fictional e-commerce website developed as part of the **CC4057NI / CC4058NI – Introduction to Information Systems** module at **Islington College, affiliated with London Metropolitan University**. It is an academic prototype created to demonstrate web development concepts using HTML, CSS, and JavaScript. It does **not** process real purchases, payments, or customer information. The coursework requires a multi-page static website featuring products, a blog, research, an about section, and a functional form.

---

# Table of Contents

* Project Overview
* Project Goals
* Technology Stack
* Project Structure
* Features
* Getting Started
* Running the Project
* Usage
* Testing
* Deployment
* Known Limitations
* Future Improvements
* Contribution Guidelines
* License
* Author
* Acknowledgments

---

# Project Overview

EcoMart is a responsive, multi-page website that simulates an online store promoting sustainable lifestyle products. The project was developed to demonstrate the practical application of HTML5, CSS3, and JavaScript while following good web design principles, responsive layouts, usability, accessibility, and client-side interactivity.

The website includes several interconnected pages, including:

* Home
* Products
* Blog
* Research
* About Us
* Shopping Cart
* Individual Team Member Portfolio Pages

---

# Project Goals

The primary objectives of this coursework are to:

* Design a professional multi-page website.
* Apply semantic HTML5 structure.
* Demonstrate styling using CSS.
* Implement JavaScript interactivity.
* Create consistent website navigation.
* Demonstrate responsive web design.
* Apply form validation and dynamic webpage content.
* Present research and comparisons of existing websites.

---

# Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Libraries

No external JavaScript frameworks or CSS libraries are required. The website is built using native web technologies.

### Development Tools

* Visual Studio Code
* Modern Web Browser (Chrome, Firefox, Edge)
* Git & GitHub

---

# Project Structure

```
EcoMart/

│
├── css/
│   └── style.css
│
├── js/
│   ├── about-page.js
│   ├── cart-page.js
│   ├── cart-widget.js
│   ├── cart.js
│   ├── data.js
│   ├── hero-rotator.js
│   ├── home-cart.js
│   ├── product.js
│   └── products-page.js
│
├── images/
│
├── pages/
│   ├── about-us.html
│   ├── blog.html
│   ├── cart.html
│   ├── product.html
│   ├── products.html
│   ├── research.html
│   ├── member1.html
│   ├── member2.html
│   ├── member3.html
│   ├── member4.html
│   └── member5.html
│
├── index.html
└── README.md
```

---

# Features

## Home Page

* Responsive landing page
* Hero banner
* Navigation bar
* Featured products
* Dynamic hero image/content rotation

## Products

* Product catalogue
* Product details
* Price display
* Product images

## Shopping Cart

* Add products to cart
* Remove products
* Update quantities
* Display total price
* Cart summary

## Blog

* Articles discussing technology and sustainability
* Educational content

## Research

* Comparison between EcoMart and reference websites
* Discussion of UI/UX components

## About Us

* Team information
* Individual member portfolio pages
* Skills and educational background

## JavaScript Features

* Dynamic content updates
* Hero image rotation
* Shopping cart functionality
* Interactive buttons
* Client-side functionality

---

# Getting Started

## Prerequisites

You only need:

* A modern web browser
* Visual Studio Code (recommended)
* Git (optional)

---

# Running the Project

Clone the repository:

```bash
git clone https://github.com/yourusername/ecomart.git
```

Navigate into the project:

```bash
cd ecomart
```

Open the project using Visual Studio Code.

If you have the Live Server extension installed:

* Right-click `index.html`
* Select **Open with Live Server**

Alternatively, simply open `index.html` directly in your browser.

---

# Usage

Typical user workflow:

1. Open the Home page.
2. Browse available products.
3. View product details.
4. Add items to the shopping cart.
5. Read blog articles.
6. Explore the research section.
7. View team member portfolios.
8. Navigate through the website using the navigation menu.

---

# Testing

This project is manually tested.

## Recommended Test Cases

### Navigation

* Verify every navigation link works correctly.

### Product Pages

* Confirm product information displays correctly.
* Verify images load properly.

### Shopping Cart

* Add multiple products.
* Remove products.
* Verify quantity updates.
* Confirm total price updates correctly.

### Responsive Design

Test on:

* Mobile
* Tablet
* Desktop

### JavaScript

Verify:

* Hero rotation
* Cart interactions
* Dynamic content updates
* Buttons function correctly

### Browser Compatibility

Test using:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox

---

# Deployment

Since EcoMart is a static website, it can be deployed easily using:

* GitHub Pages
* Netlify
* Vercel
* Firebase Hosting

Example GitHub Pages deployment:

1. Push the repository to GitHub.
2. Open **Repository Settings**.
3. Navigate to **Pages**.
4. Select the `main` branch.
5. Save changes.
6. Access the published website through the generated GitHub Pages URL.

No build process is required.

---

# Known Limitations

* No backend server.
* No real payment gateway.
* Shopping cart data is not permanently stored.
* No user authentication.
* No database integration.
* Form submissions are simulated and are not sent to a server.

---

# Future Improvements

Potential future enhancements include:

* User authentication
* Backend integration
* Database support
* Persistent shopping cart
* Checkout simulation
* Product search and filtering
* Wishlist functionality
* Order history
* Dark mode
* Improved accessibility

---

# Contribution Guidelines

This repository is primarily intended for academic purposes.

If contributing:

1. Fork the repository.
2. Create a new feature branch.

```bash
git checkout -b feature-name
```

3. Commit changes.

```bash
git commit -m "Add new feature"
```

4. Push to GitHub.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

# License

This project is submitted as university coursework.

If published publicly, consider adding the MIT License:

```
MIT License
```

or replace this section with your preferred license.

---

# Author

**Om Dangol**

Introduction to Information Systems Coursework

Islington College


---

# Acknowledgments

* Islington College
* London Metropolitan University
* Module Leader: **Mr. Pratik Panta**
* Course specification and assessment guidelines for **CC4057NI / CC4058NI – Introduction to Information Systems**.

---

## Project Status

**Status:** Completed as an academic coursework submission.

This repository demonstrates the implementation of a responsive, multi-page website using HTML, CSS, and JavaScript. It serves as a learning project showcasing frontend web development skills rather than a production-ready e-commerce platform.
