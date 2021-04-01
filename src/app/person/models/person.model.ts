export class Person {
    id: string;
    name: string;
    type: number;
    typeDescription: string;

    constructor(id: string, name: string, type: number, typeDescription: string) {
        this.id = id,
        this.name = name,
        this.type = type;
        this.typeDescription = typeDescription;
    }
}