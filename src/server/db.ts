type User = { 
    id: string; 
    name: string;
}

// 
interface MockTable<T> {
    findById(id: string): Promise<T | undefined>;
    create(data: Partial<T>): Promise<T>;
    findMany(filters: string): Promise<T[]>;
}

//
class UserMockTable implements MockTable<User> { 

    private users: User[] = [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
        { id: '3', name: 'Charlie' }
    ];

    public async findById(id: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(user => user.id === id));
    }

    public create(data: { name: string }): Promise<User> {
        const newUser: User = { 
            id: (Math.random() * 1000).toString(), 
            name: data.name 
        };
        this.users.push(newUser);
        return Promise.resolve(newUser);
    }

    public async findMany(filters?: string ): Promise<User[]> {
        return Promise.resolve(this.users);
    }
}

export const db = {
    user: new UserMockTable(),
}
