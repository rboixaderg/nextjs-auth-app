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