import { PageProps as InertiaPageProps } from "@inertiajs/core";

export interface User {
    id: number;
    name: string;
    username: string;
}

export interface PageProps extends InertiaPageProps {
    auth: {
        user: User;
    };
}

declare module "@inertiajs/core" {
    interface PageProps {
        auth: {
            user: {
                id: number;
                name: string;
                username: string;
            };
        };
    }
}