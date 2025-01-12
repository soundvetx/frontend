import { z } from "zod"

export const SearchSchema = z.object({
    search: z.string().trim()
})

export type Search = z.infer<typeof SearchSchema>
