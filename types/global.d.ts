declare module 'tailwindcss' {
    interface Config {
        content: string[];
        theme: {
            extend: {
                backgroundImage: {
                    [key: string]: string;
                };
            };
        };
        plugins: any[];
    }
}