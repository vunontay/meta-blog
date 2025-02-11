export type TActionResponse<T> = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
    metadata?: T;
};
