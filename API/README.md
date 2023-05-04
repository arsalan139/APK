# **Important Note:**

### Header must be set with jwt Token in both cases.

### Header with property "x-auth-token":Token

### Token must be present to be used for authentication in the following API

### User Token for User Routes

### Admin Token for Admin Routes

### Token will be provided when a user or admin is login

# **Auth Routes**: 

## **POST** api/auth/adminLogin

### input:

{

"email":"",

"password":""

} 

## **POST** api/auth/login

### input

{

"email":"",

"password":""

}
 
## **POST** api/auth/signUp

### input

{

"name":"",

"email":"",

"password":"",

"gender":""

}

## **POST** api/auth/forget

### input

{

"email":""

}

# **Admin Routes:** 

## **GET** api/admin/ 

## **GET** api/admin/userList 

## **GET** api/admin/workerList 

## **GET** api/admin/dashboard 

## **GET** api/admin/pendingApplication 

## **GET** api/admin/companyWallet 

## **GET** api/admin/complaints 

## **PUT** api/admin/verified/:id 

## **PUT** api/admin/categoriesPdf 

## **PUT** api/admin/userPdf

## **POST** api/admin/

###input

{

"name":"",

"email":"",

"password":""

} 

## **POST** api/admin/contactUser

### input

{

"email":"",

"subject:"",

"text":"",

"msg":"",

"order_id":"",

} 

## **PUT** api/admin/

### input

{

"name":"",

"password":""

} 

## **PUT** api/admin/restrict/:id 

## **PUT** api/admin/removeRestriction/:id 

## **DELETE** api/admin/:id

# **Categories Routes:** 

## **GET** api/categories/ 

## **GET** api/categories/:id 

## **POST** api/categories/

### input

{

"name":"",

"user:"",

"pic":""

} 

## **PUT** api/categories/

### input

{

"name":"",

"pic":"",

"id":"",

} 

## **DELETE** api/categories/:id 

# **Complaint Routes:** 

## **GET** api/complaint/:id 

## **POST** api/complaint/

### input

{

from: "",

to: "",

order: "",

category: "",

message: "",

} 

## **DELETE** api/complaint/:id

# **Commissions Routes:** 

## **GET** api/commission/ 

## **PUT** api/commission/

### input

{

"amount":"",

"user":""

}

# **Languages Routes:** 

## **GET** api/language/ 

## **GET** api/language/:id 

## **POST** api/language/

### input

{

"name":"",

"user:"",

"terms":[]

} 

## **DELETE** api/language/:id

# **Order Routes:** 

## **GET** api/order/  

## **GET** api/order/active/:id  

## **GET** api/order/:id 

## **GET** api/order/history/:id 

## **POST** api/order/

### input

{

"user":"",

"worker":"",

"category":"",

"user_type":"",

"working_time":"",

"amount":0,

"company_commission":0,


"location":{

	"lat":0,
	
	"lng":0,
	
	"address":""
	
	}

} 

## **PUT** api/order/cancel/:id 

## **PUT** api/order/accepted/:id 

## **PUT** api/order/rejected/:id 

## **PUT** api/order/completed/:id 

## **DELETE** api/order/:id

# **Promos Routes:** 

## **GET** api/promos/ 

## **GET** api/promos/:id 

## **POST** api/promos/

### input

{

user: "", //id of that person for whom the code will be made and save it against it

code: "",

endDate: "",

amount: "",

} 

## **DELETE** api/promos/:id

# **Review Routes:** 

## **GET** api/review/ 

## **GET** api/review/:id 

#### id of the person against whom the review is be made 

## **POST** api/review/

### input

{

"user": "", //id of that person where the review is made and save it against it

"name": "", //name of the person who made the review

"id": "", //id of the person who made the review

"rating": "",//rating for the person who made the review

"msg": "", //message of the person who made the review

"gender":""

} 

## **DELETE** api/review/:id

# **User Routes:** 

## **GET** api/user/ 

## **PUT**** api/user/password 

{

id:"",

password:""
}

## **GET** api/user/:id 

## **POST** api/user/email 

## **PUT** api/user/

### input

{

"gender": "",

"phone": "",

"pic": null,

"dob": "",

"language": "",

"id": "",

"name": "",

"password":""

} 

## **PUT** api/user/promoUsed/:id 

#### Route for voucher usage 

## **DELETE** api/user/:id

# **Wallet Routes:** 

## **GET** api/wallet/ 

## **GET** api/wallet/:id 

## **GET** api/wallet/history/:id 

## **POST** api/wallet/

### input

{

user: "",

amount: "",

transaction_id: "",

method: "",

} 

## **PUT** api/wallet/payPendingDues/:id 

#### id of the worker 

## **DELETE** api/wallet/:id

# **Workout Routes:** 

## **GET** api/worker/ 

## **GET** api/worker/:id 

## **POST** api/worker/applications/

## **GET** /api/worker/application/status/:id

### input

{

user: "",

category: "",

pic: "",

cnic:{

	number:"",

	front_pic: "",

	back_pic:"",

	},

address: "",

parent_cinc:"",

} 

## **DELETE** api/worker/:id
