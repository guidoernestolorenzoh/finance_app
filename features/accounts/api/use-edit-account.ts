import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";
import { string } from "zod";


type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>; 
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"]; 


export const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, RequestType, Error>({
        mutationFn: async(json) => {
            const response = await client.api.accounts[":id"]["$patch"]({param: {id}, json});
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account updated successfully!")
            queryClient.invalidateQueries({
                queryKey: ["account", {id}]
            });
            queryClient.invalidateQueries({
                queryKey: ["accounts"]
            });
            queryClient.invalidateQueries({
                queryKey: ["transactions"]
            });            
            queryClient.invalidateQueries({
                queryKey: ["summary"]
            });            
        },
        onError: () => {
             toast.error("Fail updating account");
        }
    });
    return mutation
}