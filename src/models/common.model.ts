export interface ErrorResponse {
    error: any;
  }
  
  export interface ValidationResponse {
    error: string;
    details: string[];
    success: boolean;
  }
  