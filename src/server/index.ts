import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { procedure, router } from './trpc';
import { db } from './db';
import { z } from 'zod';

const environment = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4000;

const appRouter = router({
    userList: procedure.query(async () => {
        const users = await db.user.findMany();
        return users;
    }),
    userById: procedure
    .input(z.string())
    .query(async ({ input }) => {
        const user = await db.user.findById(input);
        if (!user) {
            throw new Error(`User with id ${input} not found`);
        }
        return user;
    }),
    userCreate: procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
        const user = await db.user.create(input);
        return user;
    }),

});

export type AppRouter = typeof appRouter;

createHTTPServer({
    router: appRouter,
}).listen(port, () => {
    console.log(`Server is running in ${environment} mode on http://localhost:${port}`);
});
