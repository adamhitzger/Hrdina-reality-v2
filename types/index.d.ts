export interface ActionResponse<T> {
    submitted: boolean;
    success: boolean
    message: string;
    errors?: {
        [K in keyof T]?: Array<string>
    };
    inputs?: T
}