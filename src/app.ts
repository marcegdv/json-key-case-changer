import { camelCase, snakeCase } from "change-case";
import { convert } from "./utils/jsonKeyCase";

export const jstr = (obj: any): any => JSON.stringify(obj, undefined, 4);

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
                description: null,
                extra_object: {},
                start: new Date,
                end: new Date(3000, 11, 31, 12, 0, 0),
            },
        ];

    const result: any = convert(data, strategy);
    console.log('Original=\n' + jstr(data));
    console.log('Original to camelCase=\n' + jstr(result));
    console.log('camelCase to snake_case=\n' + jstr(convert(result, snakeCase)));

    return 0;

};

main();