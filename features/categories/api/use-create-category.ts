import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.categories.$post>; 
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"]; 


export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, RequestType, Error>({
        mutationFn: async(json) => {
            const response = await client.api.categories.$post({json});
            return await response.json();
        },
        onSuccess: () => {
            toast.success("category created successfully!")
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            });
        },
        onError: () => {
             toast.error("Fail creating category");
        }
    });
    return mutation
}