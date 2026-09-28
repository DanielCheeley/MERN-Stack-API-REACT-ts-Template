import * as z from "zod"

//change to you object fields that you will be sending with a post request
export const customObjectFields = z.strictObject({
  thing1: z.string().min(1, "thing1 is required"),
  thing2: z.string().min(1, "thing2 is required"),
  thing3: z.string().min(1, "thing3 is required"),
  enum1: z.enum(["enum1", "enum2", "enum3"])
})

//assigns the schema to to given fields
export const createIssueSchema = customObjectFields

//type for passed validation to use in db logic
export type CreateCustomObjectInput = z.infer<typeof createIssueSchema>;