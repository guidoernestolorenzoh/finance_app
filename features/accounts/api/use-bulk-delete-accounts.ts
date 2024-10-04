import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>; 
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"]; 


export const useBulkDeleteAccounts = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, RequestType, Error>({
        mutationFn: async(json) => {
            const response = await client.api.accounts["bulk-delete"]["$post"]({json});
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Accounts deleted successfully!")
            queryClient.invalidateQueries({
                queryKey: ["accounts"]
            });
        },
        onError: () => {
             toast.error("Fail delete accounts");
        }
    });
    return mutation
}