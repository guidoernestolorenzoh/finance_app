import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";
import { string } from "zod";


type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>; 


export const useDeleteTransaction = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async() => {
            const response = await client.api.transactions[":id"]["$delete"]({param: {id}});
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Transaction deleted successfully!")
            queryClient.invalidateQueries({
                queryKey: ["transaction", {id}]
            });
            queryClient.invalidateQueries({
                queryKey: ["transactions"]
            });
        },
        onError: () => {
             toast.error("Fail deleting transaction");
        }
    });
    return mutation
}