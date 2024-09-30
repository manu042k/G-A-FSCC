# d-grocery: A Full Stack Web Application

d-grocery is a full-stack grocery shopping web application built using Django for the backend and Angular for the frontend. The application displays grocery items, allows users to add items to their cart, and provides a checkout flow without processing actual payments. Data persists through browser refreshes using SQLite as the database for storing backend data.

## Requirements

For specific requirements related to both backend and frontend, refer to the respective `README` files inside the `backend` and `frontend` directories.

### Problem Statement or Requirements

- **Seed your data from an API**
  - For this challenge, you’ll be provided with a read-only JSON file instead of a live API.
- **Design a UI** for displaying useful information about various types of grocery items:
  - Name
  - Category
  - Price
  - Image
  - Quantity
- **Provide user controls** for the following flows:

  1. **Adding items to a cart**
  2. **Item checkout process** (without processing actual payments)

- All data should **persist through a browser refresh**.

---

## Architecture

### **Backend (Django)**

The backend of the application is built using Django and SQLite as the database. Django serves as the API layer, handling CRUD operations and data persistence.

- **Django Models**:

  - **User**: Manages user information and authentication.
  - **Product**: Stores grocery item details such as name, price, image, category, and available quantity.
  - **CartItem**: Tracks the products added to a user's cart.
  - **Order**: Handles orders once the user checks out.

- **API Endpoints** (via Django REST Framework):
  - **/api/products/**: Retrieves all products.
  - **/api/cart/**: Manages adding/removing products from the cart.
  - **/api/order/**: Creates orders and returns order details (without actual payment processing).

### **Frontend (Angular)**

The frontend is developed using Angular, where users can browse grocery items, manage their cart, and proceed to the checkout process.

- **Components**:

  - **Product List**: Displays the grocery items (name, category, price, image, quantity).
  - **Cart**: Shows the items added to the cart with the option to update or remove items.
  - **Checkout**: Finalizes the order, submitting it to the backend.

- **Services**:

  - **Product Service**: Fetches the list of products from the Django API.
  - **Cart Service**: Manages cart operations, syncing with the backend.
  - **Order Service**: Handles the checkout process and order submission.

- **State Management**:
  - All data persists through browser refreshes using Angular’s built-in services for API calls and local storage.

## Feature Enhancements

- The implementation of an `httpInterceptor` for error handling and loading spinners was not included due to time constraints.
- To Ensure the website is responsive across all screen sizes.
- Several modifications should be made to the backend order APIs.
- Introduce NgRx for state management.
