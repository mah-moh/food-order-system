package main

import (
	"server/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())
	router.POST("/admin/register", controllers.KitchenRegister)
	router.POST("/admin/signin", controllers.KitchenSignin)
	router.POST("/signup", controllers.HandleSignup)
	router.POST("/signin", controllers.HandleSignin)
	router.POST("/add/food", controllers.AddFood)
	router.GET(("/get/food"), controllers.GetFood)
	router.POST("/post/order", controllers.PostOrder)
	router.GET("/get/order/", controllers.GetOrder)
	router.POST("/user/address", controllers.PostAddress)
	router.Run()
}
