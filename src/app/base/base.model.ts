export interface requestBaseDto {
    
}
export interface responseBaseDto {
    id: number;
}

export interface ResponseObject<T> {
  isSuccess: boolean;
  result: T;
  message: string;   
}