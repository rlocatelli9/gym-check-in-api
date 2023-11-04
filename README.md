# API 

GymPass style app

if you want to run the docker with WSL2, you need to start the service before than.
```sh
sudo service docker start
```

## RF (Requisitos Funcionais)

- [] Should be able to register
- [] Should be able to signin
- [] Should be able to get the user's profile signed
- [] Should be able to get the check-in number for user signed
- [] Should be able to get check-in history of user
- [] Should be able to search for nearby gyms
- [] Should be able to search by gym's name
- [] Should be able to check-in in one gym
- [] Should be able to validate the check-in of user
- [] Should be able to register the Gym

## RN (Regras de Negócio)

- [] The user is not allowed to register with duplicated e-mail
- [] The user is not allowed to 2 check-in the same day
- [] The user is not allowed to check-in when the distance is greater than 100m
- [] The time for validate check-in is 20min
- [] The check-in should be validate by admin only
- [] The Gym should be register by admin only

## RNF (Requisitos Não Funcionais)

- [] The user's password need be crypt
- [] The aplication data need be persisted in the PostgreSQL database
- [] All the data list need to be paginate with 20 items per page
- [] The user should be authenticated using JWT (JSON Web Token)
