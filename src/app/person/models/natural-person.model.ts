import { Address } from "./address.model";
import { Document } from "./document.model";

export class NaturalPerson {
    id: string;
    name: string;
    birthday: string;
    gender: number;
    address: Address;
    document: Document;
}