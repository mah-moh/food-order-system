package controllers

import (
	"fmt"
	"server/database"
	"server/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func GetOrder(c *gin.Context) {
	// var order models.Order

	//Connecting to db
	database.Connect()

	defer database.DB.Close()
	// id := c.Param("id")
	// fmt.Println(id)
	fmt.Println("Getting request")

	// counter := 1

	// var s []models.Order

	// for {
	// 	// var food models.Food
	// 	// err := database.DB.QueryRow("select * from test.food").Scan(&food.Id, &food.Title, &food.Price)
	// 	// if err != nil {
	// 	// 	break
	// 	// }
	// 	// s = append(s, order)
	// 	// counter++

	// }
}

func PostAddress(c *gin.Context) {
	var address models.Address
	c.BindJSON(&address)

	//Connecting to db
	database.Connect()

	defer database.DB.Close()

	insert, err := database.DB.Query(fmt.Sprintf("INSERT INTO test.address (place, contact)  VALUES ('%v', '%v');", address.Place, address.Contact))
	if insert != nil {
		fmt.Println("inserted order")
	}
	if err != nil {
		fmt.Print(err.Error())
	}
}

func PostOrder(c *gin.Context) {
	var order models.Order
	c.BindJSON(&order)

	//Connecting to db
	database.Connect()

	defer database.DB.Close()

	insert, err := database.DB.Query(fmt.Sprintf("INSERT INTO test.food_order (user_id, food_id)  VALUES ('%v', '%v');", order.User_id, order.Food_id))
	if insert != nil {
		fmt.Println("inserted order")
	}
	if err != nil {
		fmt.Print(err.Error())
	}

}

func GetFood(c *gin.Context) {
	var s []models.Food
	//Connecting to db
	database.Connect()

	counter := 1

	defer database.DB.Close()

	for {
		var food models.Food
		err := database.DB.QueryRow("select * from test.food where id=?", counter).Scan(&food.Id, &food.Title, &food.Price)
		if err != nil {
			break
		}
		s = append(s, food)
		counter++

	}
	fmt.Println(s)
	c.JSON(200, s)

}

func AddFood(c *gin.Context) {
	//Connecting to db
	database.Connect()

	var foodItem models.Food
	c.BindJSON(&foodItem)
	fmt.Print(foodItem)
	defer database.DB.Close()
	insert, err := database.DB.Query(fmt.Sprintf("INSERT INTO test.food (title, price)  VALUES ('%v', '%v');", foodItem.Title, foodItem.Price))
	if insert != nil {
		fmt.Println(insert)
	}
	if err != nil {
		panic(err)
	}
	c.JSON(200, foodItem)
}

func KitchenSignin(c *gin.Context) {
	//Connecting to db
	database.Connect()

	//parsing post request data
	var adminSingin models.Admin
	c.BindJSON(&adminSingin)
	fmt.Println(adminSingin)

	defer database.DB.Close()

}

func KitchenRegister(c *gin.Context) {
	//Connecting to db
	database.Connect()

	//parsing post request data
	var admin models.Admin
	c.BindJSON(&admin)
	fmt.Println(admin)

	defer database.DB.Close()

	//Inserting user data to db
	insert, err := database.DB.Query(fmt.Sprintf("INSERT INTO test.admin (email, password)  VALUES ('%v', '%v');", admin.Email, admin.Passwd))
	if insert != nil {
		c.JSON(200, admin)
	}
	if err != nil {
		fmt.Print(err.Error())
	}
}

func HandleSignin(c *gin.Context) {

	//Connecting to db
	database.Connect()

	//parsing post request data
	var user models.SigninUser
	c.BindJSON(&user)
	fmt.Println(user)

	if user.IsManager == "true" {
		var admin models.Admin
		err := database.DB.QueryRow("select * from admin where email=?", user.Email).Scan(&admin.Email, &admin.Passwd)
		if err != nil {
			fmt.Println(err.Error())
		} else {
			if user.CurrentPass == admin.Passwd {
				c.JSON(200, user)
				fmt.Println("welcome")
				return
			}
			fmt.Println("Password does not match")
		}
		return
	}

	var userData models.User
	defer database.DB.Close()

	//Quering to db
	err := database.DB.QueryRow("select * from customer where email=?", user.Email).Scan(&userData.Id, &userData.FirstName, &userData.LastName, &user.Email, &userData.Passwd)
	if err != nil {
		fmt.Println(err.Error())
	} else {
		err := bcrypt.CompareHashAndPassword([]byte(userData.Passwd), []byte(user.CurrentPass))
		if err != nil {
			fmt.Println("Password or email does not match")
		} else {
			c.Header("access-control-allow-origin", "*")
			c.JSON(200, userData)
			fmt.Println(userData.Id)
			fmt.Println("Welcome")
		}
	}
}

func HandleSignup(c *gin.Context) {
	//conneting to db
	database.Connect()

	//parsing post request data
	var user models.User
	c.BindJSON(&user)
	fmt.Println(user)
	defer database.DB.Close()

	//encripting password
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(user.Passwd), bcrypt.MinCost)

	//Inserting user data to db
	insert, err := database.DB.Query(fmt.Sprintf("INSERT INTO test.customer (fname, lname, email, password)  VALUES ('%v', '%v', '%v', '%v');", user.FirstName, user.LastName, user.Email, string(hashedPass)))
	if insert != nil {
		fmt.Println("inserted")
	}
	if err != nil {
		fmt.Print(err.Error())
	}
}
