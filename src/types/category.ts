import { type } from "os";

export type Category = {
    [tag: string]: {
        title: string;
        color: string;
        expense: boolean;
    }
}