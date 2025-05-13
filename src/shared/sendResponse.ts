import { Response } from "express"

export const sendResponse = <T>(res: Response, jsonData:{
  statusCode: number, 
  success: boolean,
  message: string,
  meta?: {
    page: number
    limit: number
    total: number
    
  }
  data: T | null | undefined
})=>{
   res.status(jsonData.statusCode).json({
      success: jsonData.success,
      message: jsonData.message,
      meta: jsonData.meta || undefined || null,
      data: jsonData.data || undefined || null,
    })
}