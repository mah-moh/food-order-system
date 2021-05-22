package database

import (
	"database/sql"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func Connect() {
	cfg := mysql.Config{
		User:   "debian-sys-maint",
		Passwd: "YZkKRHnDn0I8XsvK",
		Net:    "tcp",
		DBName: "test",
	}

	db, err := sql.Open("mysql", cfg.FormatDSN())

	DB = db

	fmt.Println("Database connected")

	if err != nil {
		panic(err.Error())
	}

}
