# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Products

- Index: `'/api/products/' [GET]`
- Show: `'/api/products/:id' [GET]`
- Create [token required]: `'/api/products/' [POST](token)`
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category) `'/api/products?category=[category]' [GET]`
- [ADDED] Delete [token required]: `'/api/products?category=[category]' [GET]`

#### Users

- Index [token required]: `'/api/users' [GET](token)`
- Show [token required]: `'/api/users/:userID' [GET](token)`
- Create N[token required]: `'/api/auth/register' [POST](token)`
- Login N[token required]: `'/api/auth/login' [POST](token)`
- Delete N[token required]: `'/api/users/' [POST](token)`

#### Orders

- Current Order by user [args: user id](token required) `'/api/orders/:orderId' [GET](token)`
- [OPTIONAL] Completed Orders by user [args: user id](token required)
- [ADDED] Create order [token required]: `'/api/orders' [POST](token)`
- [ADDED] Get all orders [token required]: `'/api/orders' [GET](token)`
- [ADDED] Delete order [token required]: `'/api/orders/:orderId' [DELETE](token)`

## Data Shapes

### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
