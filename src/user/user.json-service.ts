import { User } from './user';
import { UserService } from './user.service';
import fs from 'fs';

export class UserJSONService implements UserService {

    private users!: User[];
    private IDnew : number = 0
    private newUser !: User 

    constructor() {
        const data = fs.readFileSync('./src/user/users.json', 'utf-8');
        this.users = JSON.parse(data);
    }


    add(username: string): User {
        
        const trouveByUsername = this.getByUsername(username)
       
        if (trouveByUsername != null) {
            throw new Error("l'utilisateur est déja inscrit");
        } else {

            this.IDnew = this.generationID()
            const trouveById = this.getById(this.IDnew)

            if (trouveById != null) { this.IDnew = this.generationID() } 

            this.newUser = new User(this.IDnew, username)
            this.users.push(this.newUser)
            fs.writeFileSync('./src/user/users.json', JSON.stringify(this.users, null, 2), 'utf-8');
        }

        return this.newUser

    }

     getById(id: number): User | null {
        const user = this.users.find(user => user.id === id);
        return user || null;
    }

     getByUsername(username: string): User | null {
        const user = this.users.find(user => user.username === username);
        return user || null;
    }


    generationID() : number {
        return Math.floor(Math.random() * 10000);
    }
}
