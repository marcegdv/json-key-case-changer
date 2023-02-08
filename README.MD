# Cambiar el 'case' de las claves de un objeto JSON

Mediante la librería `change-case` se ajustan las claves de un objeto JSON, ya que a veces hay que trabajar con objetos que las claves estan en camelCase y también tienen que estar en snake_case.

## Ejemplo:

Convertir el objeto que tiene las claves en camelCase:
```js
const origin = {
    id: 3,
    firstName: 'John',
    lastName: 'Doe',
    userAliasesList: [
        'jd', 'Johny'
    ],
    location: {
        fullAddress: 'Fake street 123',
        city: 'LA',
    },
}
```
a snake_case:
```js
const expected = {
    id: 3,
    first_name: 'John',
    last_name: 'Doe',
    user_aliases_list: [
        'jd', 'Johny'
    ],
    location: {
        full_address: 'Fake street 123',
        city: 'LA',
    },
}
```

## Función convert(input, startegy):

Es la que realiza la conversión del ejemplo:
```js
import { snakeCase } from "change-case";

const result = convert(origin, snakeCase);
```

Se pueden usar las otras funciones disponibles de la librería `change-case` o la que tengas.