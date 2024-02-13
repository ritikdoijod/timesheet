import { ObjectId } from "mongodb";
import { z } from "zod";
const ParamsWithId = z.object({
    id: z.string().refine((id) => {
        try {
            return new ObjectId(id);
        }
        catch (error) {
            return false;
        }
    }, { message: "Invalid ObjectId" }),
});
export { ParamsWithId };
