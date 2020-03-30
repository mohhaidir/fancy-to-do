# fancy-to-do

### ===== List of Routers ====
#### POST /todos

req.body
{
  "title": "Learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize",
  "due_date": "2020-03-30"
}

response if success
{
  "id": 1,
  "title": "Learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize",
  "due_date": "2020-03-30"
}
response if no data on request



#### GET /todos
{
  "id": 1,
  "title": "Learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize",
  "due_date": "2020-03-30"
}

#### GET /edit/:id
#### PUT /edit/:id
#### delete /delete/:id