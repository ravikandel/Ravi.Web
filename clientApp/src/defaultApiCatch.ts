import { toast } from "react-toastify";
import { ApiException } from "./api";

declare global {
    interface Promise<T> {
        defaultCatch(): Promise<T>;
    }
}
/* eslint no-extend-native: ["error", { "exceptions": ["Promise"] }] */
Promise.prototype.defaultCatch = function <T>(this: Promise<T>): Promise<void | T> {
    return this.catch((error) => {
        if (error instanceof ApiException && error.code === 403) {
            toast.error("Error: Unauthorized access.", {
                autoClose: false,
                draggable: false,
                closeButton: true,
                closeOnClick: true
            });
        } else {
            toast.error(`An error occurred: ${error.message}`, {
                autoClose: false,
                draggable: false,
                closeButton: true,
                closeOnClick: true
            });
        }
    });
}