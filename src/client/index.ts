import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const trpcClient = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:4000',
        }),
    ],
});

async function main() {
    try {

        const queryUserById = await trpcClient.userById.query('1');
        console.log(queryUserById);

        const mutateCreteUser = await trpcClient.userCreate.mutate({ name: 'Albert' });
        console.log(mutateCreteUser);

        const queryMultipleUsers = await trpcClient.userList.query();
        console.log(queryMultipleUsers);

    } catch (error) {
        console.error('Error:', error);
    }
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});