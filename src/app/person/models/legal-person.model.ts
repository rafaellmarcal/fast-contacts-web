import { Address } from "./address.model";
import { Document } from "./document.model";

export class LegalPerson {
    id: string;
    companyName: string;
    tradeName: string;
    address: Address;
    document: Document;
}