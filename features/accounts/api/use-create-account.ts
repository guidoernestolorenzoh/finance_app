import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.accounts.$post>; 
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"]; 


export const useCreateAccount = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, RequestType, Error>({
        mutationFn: async(json) => {
            const response = await client.api.accounts.$post({json});
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account created successfully!")
            queryClient.invalidateQueries({
                queryKey: ["accounts"]
            });
        },
        onError: () => {
             toast.error("Fail creating account");
        }
    });
    return mutation
}