# Projecte exemple autenticació i gestió de la sessio amb NextJs. 

## Guillotina

En la carpeta guillotina hi tenim el servidor sobre el qual farem el login

Comandes per inicialitzar dades a la guillotina

```bash
curl --location --request POST 'http://localhost:8080/db/' \
--header 'Authorization: Basic cm9vdDpyb290' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id":"container",
    "@type":"Container"
}'

curl -i -X POST http://localhost:8080/db/container/@addons -H 'Accept: application/json' -H 'Content-Type: application/json' --data-raw '{"id": "dbusers"}' --user root:root
curl -i -X POST http://localhost:8080/db/container/users -H 'Accept: application/json' -H 'Content-Type: application/json' --data-raw '{"@type": "User", "email": "user_test@test.cat", "password": "user_test", "user_roles": ["guillotina.Member"], "username": "user_test"}' --user root:root

```


## next-auth-app

En la carpeta next-auth-app hi tenim l'exemple d'aplicació que utilitza la llibreria next-auth per gestionar l'inici de la sessió i la sessió

## nextjs-iron-session-app

En la carpeta nextjs-iron-session-app hi tenim l'exemple d'aplicació que utilitza la llibreria iron-session per gestionar l'inici de la sessió i la sessió 

## e2e

En la carpeta e2e hi tenim els tests realitzats amb playwright.