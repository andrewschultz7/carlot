# CarCar

### TEAM:

* Person 1 - Sales Corey Lyon
* Person 2 - Service Andrew Schultz
<br />
<br />

[TOC]

### STEPS:

1. In terminal enter:
```
docker volume create beta-data
docker compose build
docker compose up
```

<br />

2. Wait until all containers are running and you see:
    - Compiled successfully!
    - May take some time....possibly a long time.

<br />
<br />

3. You can now view app in the browser.
    - Local:            http://localhost:3000
    - On Your Network:  http://172.18.0.2:3000
<br />
<br />

4. Go to localhost:3000
<br />
<br />



### DESIGN:

![](/images/diagram.PNG)


<br />
<br />

## SERVICE MICROSERVICE:

Service URLs

Home                           http://localhost:3000<br/>
Service List                   http://localhost:3000/service<br/>
Create New Service Appointment http://localhost:3000/service/new<br/>
Service History                http://localhost:3000/history<br/>
Technician List                 http://localhost:3000/technicians<br/>
Create New Technician           http://localhost:3000/technicians/new<br/>


<br />
<br />

Service CRUD routes:

GET    http://localhost:8080/api/service/{id}/<br/>
Preview:
 ```JSON
      {
        "href": "/api/service/6/",
        "id": 6,
        "vin": "ccc",
        "name": "c",
        "date_time": "2022-12-07T21:33:00+00:00",
        "reason": "adfa",
        "technician": {
            "name": "Fred3",
            "employee_id": 13
        },
        "vip": false,
        "finished": false
}
```
POST   http://localhost:8080/api/service/
```JSON
    {
        "vin": "56aab21",
        "name": "Sally",
	    "date_time": "2022-12-22T13:03",
	    "reason": "oil",
	    "employee_id": 13
    }
```
PUT    http://localhost:8080/api/service/{id}/
<br />

DEL    http://localhost:8080/api/shoes/{id}/
<br />
<br />

### Automobiles CRUD routes:
<br />


GET    http://localhost:8100/api/automobiles/{vin}/<br/>
Preview:
```JSON
    {
        "href": "/api/automobiles/aaa/",
        "id": 3,
        "color": "Black",
        "year": 2022,
        "vin": "aaa",
        "model": {
            "href": "/api/models/3/",
            "id": 3,
            "name": "4Runner",
            "picture_url": "https://b4b5c1145153456265d2-9d3406d30c372f29f9bbc002ff61c1af.ssl.cf1.rackcdn.com/JTEZU5JRXJ5177998/e0593211f81d93a4117b91ae19969de7.jpg",
            "manufacturer": {
                "href": "/api/manufacturers/3/",
                "id": 3,
                "name": "Toyota"
                }
            }
    }
```
POST    http://localhost:8100/api/automobiles/
 ```JSON
    {
        "color": "red",
        "year": 2012,
        "vin": "1C3CC5FB2AN120174",
        "model_id": 1
}
```

### Automobiles Value Object:
```Python
color = models.CharField(max_length=50)
year = models.PositiveSmallIntegerField()
vin = models.CharField(max_length=17, unique=True)
```


***********************
<br />
<br />

## SALES MICROSERVICE:

Back-end: Views use RESTful routes to add, delete, and view individual sales, customers, and salespeople,  or a list of sales, customers, and salespeople.<br/>
Front-end: Users can add, delete, and view individual sales, customers, and salespeople, or lists of sales, customers, or salespeople using React and RESTful routes.

### SALES CRUD

Home - http://localhost:3000<br/>
List sales - http://localhost:3000/sales/<br/>
Create a new sale - http://localhost:3000/sales/new/<br/>
View salesperson history - http://localhost:3000/sales/history<br/>
List salespeople - http://localhost:3000/salespeople<br/>
Create a new salesperson - http://localhost:3000/salespeople/new/<br/>
List customers - http://localhost:3000/customers/<br/>
Create a new customer - http://localhost:3000/customers/new/<br/>
<br />
<br />

DELETE - http://localhost:8090/api/sales/5/
    Example response:
 ```JSON
        {
            "deleted": true
        }
 ```
 POST - http://localhost:8090/api/sales/
    Example POST data:
 ```JSON
        {
            "auto": "1C3CC5FB2AN121174",
            "salesperson": "1",
            "customer": "1",
            "price": "10"
        }
```
GET (Sale Details) - http://localhost:8090/api/sales/1/
    Example response:
 ```JSON
        {
            "fabric": "Leather",
            "style": "Cowboy",
            "color": "Brown",
            "picture_url": "https://cdn11.bigcommerce.com/s-p3k2n80ho/images/stencil/1280x1280/products/9641/4414/SBWTMR__41091.1528206336.jpg?c=2",
            "location": {
                "closet_name": "Master bedroom",
                "import_href": "/api/locations/1/",
                "section_number": 1,
                "shelf_number": 1,
                "id": 2
            },
            "id": 7
        }
```
GET (Sale List) - http://localhost:8090/api/sales/
    Example response:
```JSON
        {
            "hats": [
            {
                "fabric": "Leather",
                "style": "Cowboy",
                "color": "Brown",
                "picture_url": "https://cdn11.bigcommerce.com/s-p3k2n80ho/images/stencil/1280x1280/products/9641/4414/SBWTMR__41091.1528206336.jpg?c=2",
                "location": {
                    "closet_name": "Master bedroom",
                    "import_href": "/api/locations/1/",
                    "section_number": 1,
                    "shelf_number": 1,
                    "id": 2
                },
                "id": 7
            },
            {
                "fabric": "Canvas",
                "style": "Snapback",
                "color": "Black",
                "picture_url": "https://i5.walmartimages.com/asr/e93bbe67-775c-4eaa-bc80-e3a7a2b2d646_1.8e2bf5671bd6d0e755febf2cf46b4657.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
                "location": {
                    "closet_name": "Master bedroom",
                    "import_href": "/api/locations/1/",
                    "section_number": 1,
                    "shelf_number": 1,
                    "id": 2
                },
                "id": 9
            }
            ]
        }
```
DELETE - http://localhost:8090/api/customers/5/
    Example response:
 ```JSON
        {
            "deleted": true
        }
 ```
POST - http://localhost:8090/api/customers/
    Example POST data:
 ```JSON
        {
            "name": "Joe Customer",
            "address": "123 House Road",
            "phone": "1234567890"
        }
```
GET (Customer Details) - http://localhost:8090/api/customers/1/
    Example response:
 ```JSON
        {
            "fabric": "Leather",
            "style": "Cowboy",
            "color": "Brown",
            "picture_url": "https://cdn11.bigcommerce.com/s-p3k2n80ho/images/stencil/1280x1280/products/9641/4414/SBWTMR__41091.1528206336.jpg?c=2",
            "location": {
                "closet_name": "Master bedroom",
                "import_href": "/api/locations/1/",
                "section_number": 1,
                "shelf_number": 1,
                "id": 2
            },
            "id": 7
        }
```
GET (Customer List) - http://localhost:8090/api/customers/
    Example response:
```JSON
{
	"customers": [
		{
			"name": "Iwanna Buyacar",
			"address": "123 Sellmestuff Ln",
			"phone": "1234567890",
			"id": 1
		}
	]
}
```
DELETE - http://localhost:8090/api/salespeople/5/
    Example response:
 ```JSON
        {
            "deleted": true
        }
 ```
 POST - http://localhost:8090/api/salespeople/
    Example POST data:
 ```JSON
        {
            "name": "John Salesman",
            "employee_number": "159263"
        }
```
GET (Salesperson Details) - http://localhost:8090/api/customers/1/
    Example response:
 ```JSON
        {
            "fabric": "Leather",
            "style": "Cowboy",
            "color": "Brown",
            "picture_url": "https://cdn11.bigcommerce.com/s-p3k2n80ho/images/stencil/1280x1280/products/9641/4414/SBWTMR__41091.1528206336.jpg?c=2",
            "location": {
                "closet_name": "Master bedroom",
                "import_href": "/api/locations/1/",
                "section_number": 1,
                "shelf_number": 1,
                "id": 2
            },
            "id": 7
        }
```
GET (Salesperson List) - http://localhost:8090/api/salespeople/
    Example response:
```JSON
{
	"salespeople": [
		{
			"import_href": null,
			"name": "Jane Saleswoman",
			"employee_number": "123456",
			"id": 3
		},
		{
			"import_href": null,
			"name": "John Salesman",
			"employee_number": "123123",
			"id": 4
		},
		{
			"import_href": null,
			"name": "Doug Dimmadome",
			"employee_number": "159263",
			"id": 5
		}
	]
}
```
### Automobile Value Object

AutomobileVO:
import_href = models.CharField(max_length=200, unique=True, null=True)<br/>
vin = models.CharField(max_length=17, unique=True)<br/>
>*Vehicle identification number of the specific vehicle in inventory*<br/>

sold = models.BooleanField(default=False)<br/>
>*Inventory status of the vehicle*<br/>
