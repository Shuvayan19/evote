import { z } from "zod";    

export const verifySchema=z.object({
    verifycode:z.string().length(6,{message:"code must be 6 digit"})
})