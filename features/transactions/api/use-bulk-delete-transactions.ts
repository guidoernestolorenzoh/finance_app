import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>; 
type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>["json"]; 


export const useBulkDeleteTransactions = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, RequestType, Error>({
        mutationFn: async(json) => {
            const response = await client.api.transactions["bulk-delete"]["$post"]({json});
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Transactions deleted successfully!")
            queryClient.invalidateQueries({
                queryKey: ["transactions"]
            });
            queryClient.invalidateQueries({
                queryKey: ["summary"]
            });
        },
        onError: () => {
             toast.error("Fail deleting transactions");
        }
    });
    return mutation
}