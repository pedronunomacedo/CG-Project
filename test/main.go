package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	// "github.com/gofiber/fiber/v2"
	_ "github.com/jinzhu/gorm/dialects/postgres"

	"requestoken/config"
	"requestoken/db"
	"requestoken/router"
)


var serverLink string = "127.0.0.1:" + config.PORT

func main() {
	// 1. Create and initialize the postgresql database (Create a separate function to intialize the database)
	dbErr := db.InitPostgres()
	if dbErr != nil {
		log.Println("Error: ", dbErr)
		return
	}

	// 2. Initialize the Gin Gonic router
	engine := gin.Default() // Initialize a gin router
	engine.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins: []string{"*"},
	}))
	
	router.SetEndpoints(engine)

	engine.Run(serverLink)
}