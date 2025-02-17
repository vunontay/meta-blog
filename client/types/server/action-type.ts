export type TActionResponse<T> = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
    metadata?: T;
};

export type TActionState<T> =
    | {
          data?: T;
          errors?: {
              [K in keyof T]?: string[];
          };
          message?: string;
      }
    | undefined;
