import { z } from "zod";
export const requestQueryParametersSchema = z.object({
    token: z.string(),
    domain: z.string(),
});
