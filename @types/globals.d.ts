declare namespace NodeJS {
    export interface ProcessEnv {
        MYSQL_HOST: string;
        MYSQL_PORT: string;
        MYSQL_USER: string;
        MYSQL_PASSWORD: string;
        MYSQL_DATABASE: string;
        RAPIDAPI_KEY: string;
    }
}
