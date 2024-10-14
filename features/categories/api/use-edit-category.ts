import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";
import { string } from "zod";


type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>; 
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"]; 


export const useEditCategory = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, RequestType, Error>({
        mutationFn: async(json) => {
            const response = await client.api.categories[":id"]["$patch"]({param: {id}, json});
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Category updated successfully!")
            queryClient.invalidateQueries({
                queryKey: ["category", {id}]
            });
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            });
            queryClient.invalidateQueries({
                queryKey: ["transactions"]
            });
            queryClient.invalidateQueries({
                queryKey: ["summary"]
            });
        },
        onError: () => {
             toast.error("Fail updating category");
        }
    });
    return mutation
}