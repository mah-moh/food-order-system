package models

type Kitchens struct {
	Name   string `json:"name"`
	Id     uint   `json:"id"`
	Status bool   `json:"status"`
}

type Admin struct {
	Email  string `json:"email"`
	Passwd string `json:"password"`
}

type User struct {
	Id        int    `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Passwd    string `json:"password"`
}

type SigninUser struct {
	Id          uint64 `json:"id"`
	Email       string `json:"email"`
	CurrentPass string `json:"password"`
	IsManager   string `json:"isManager"`
}

type Food struct {
	Id    uint   `json:"id"`
	Title string `json:"title"`
	Price string `json:"price"`
}

type Order struct {
	User_id uint `json:"user_id"`
	Food_id uint `json:"food_id"`
}

type Address struct {
	Place   string `json:"place"`
	Contact string `json:"contact"`
}
