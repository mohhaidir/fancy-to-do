# fancy-to-do
## =================== [ - List of Routers - ] ===================
## POST /todos
#### request body 
  {
    "id": 34,
    "title": "test title",
    "description": "test description",
    "status": "test status",
    "due_date": "2020-03-30T00:00:00.000Z",
  }

#### response if success || response 200
  {
    "result": {
      "id": 34,
      "title": "test title",
      "description": "test description",
      "status": "test status",
      "due_date": "2020-03-30T00:00:00.000Z",
      "updatedAt": "2020-03-30T09:17:16.531Z",
      "createdAt": "2020-03-30T09:17:16.531Z"
    }
  }
#### response if no data on request || response 400
  {
    "errors": [
      {
        "message": "title tidak boleh kosong",
        "type": "notNull Violation",
        "path": "title",
        "value": null,
        "origin": "CORE",
        "instance": {
          "id": null,
          "updatedAt": "2020-03-30T09:18:05.583Z",
          "createdAt": "2020-03-30T09:18:05.583Z"
        },
        "validatorKey": "is_null",
        "validatorName": null,
        "validatorArgs": []
      },
      {
        "message": "desciption tidak boleh kosong",
        "type": "notNull Violation",
        "path": "description",
        "value": null,
        "origin": "CORE",
        "instance": {
          "id": null,
          "updatedAt": "2020-03-30T09:18:05.583Z",
          "createdAt": "2020-03-30T09:18:05.583Z"
        },
        "validatorKey": "is_null",
        "validatorName": null,
        "validatorArgs": []
      },
      {
        "message": "status tidak boleh kosong",
        "type": "notNull Violation",
        "path": "status",
        "value": null,
        "origin": "CORE",
        "instance": {
          "id": null,
          "updatedAt": "2020-03-30T09:18:05.583Z",
          "createdAt": "2020-03-30T09:18:05.583Z"
        },
        "validatorKey": "is_null",
        "validatorName": null,
        "validatorArgs": []
      },
      {
        "message": "date tidak boleh kosong",
        "type": "notNull Violation",
        "path": "due_date",
        "value": null,
        "origin": "CORE",
        "instance": {
          "id": null,
          "updatedAt": "2020-03-30T09:18:05.583Z",
          "createdAt": "2020-03-30T09:18:05.583Z"
        },
        "validatorKey": "is_null",
        "validatorName": null,
        "validatorArgs": []
      }
    ]
  }

## GET /todos
#### response get data || response 200
  {
    "result": [
      {
        "id": 34,
        "title": "test title",
        "description": "test description",
        "status": "test status",
        "due_date": "2020-03-30T00:00:00.000Z",
        "createdAt": "2020-03-30T09:17:16.531Z",
        "updatedAt": "2020-03-30T09:17:16.531Z"
      }
    ]
  }

## GET /:id
#### request params by id
#### response get data by ID if ID founded || response 200
  {
    "result": {
      "id": 34,
      "title": "test title",
      "description": "test description",
      "status": "test status",
      "due_date": "2020-03-30T00:00:00.000Z",
      "createdAt": "2020-03-30T09:17:16.531Z",
      "updatedAt": "2020-03-30T09:17:16.531Z"
    }
  }

#### response get data by ID if ID not found || response 404
  {
    "result": {
      "msg": "data dengan id: 34 tidak ditemukan!"
    }
  }

## PUT /:id
#### request params by id
#### request body 
  {
    "id": 34,
    "title": "test title2",
    "description": "test description2",
    "status": "test status2",
    "due_date": "2020-03-30T00:00:00.000Z",
  }
#### response put ID if ID found || response 200
  {
    "result": {
      "title": "test title2",
      "description": "test description2",
      "status": "test status2",
      "due_date": "2020-03-12"
    }
  }
#### response put ID if ID not found || response 404
  {
    "errors": "not found!"
  }

## delete /:id
#### request params by id
#### response put ID if ID found || response 200
  [
    {
      "id": 34,
      "title": "test title2",
      "description": "test description2",
      "status": "test status2",
      "due_date": "2020-03-12T00:00:00.000Z",
      "createdAt": "2020-03-30T09:17:16.531Z",
      "updatedAt": "2020-03-30T09:24:43.719Z"
    },
    "data telah dihapus !"
  ]

#### response put ID if ID not found || response 404
  {
    "errors": {
      "notFound": "data with id: 4 not found"
    }
  }