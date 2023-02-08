import { camelCase, snakeCase } from "change-case";
import { convert, jstr } from "./utils/jsonKeyCase";

export const main = (): number => {

    console.log('Example:');
    const strategy: Function = camelCase;
    const data: any =
        [
            {
                first_name: 'asd',
                user_list: [
                    {
                        user_name: 'user1',
                    },
                    {
                        user_name: 'user2',
                    },
                ],
            }
        ];

    const result: any = convert(data, strategy);
    console.log('Original=\n' + jstr(data));
    console.log('Original to camelCase=\n' + jstr(result));
    console.log('camelCase to snake_case=\n' + jstr(convert(result, snakeCase)));

    return 0;

};

main();