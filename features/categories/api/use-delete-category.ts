import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>; 


export const useDeleteCategory = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async() => {
            const response = await client.api.categories[":id"]["$delete"]({param: {id}});
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Category deleted successfully!")
            queryClient.invalidateQueries({
                queryKey: ["category", {id}]
            });
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            });
        },
        onError: () => {
             toast.error("Fail deleting category");
        }
    });
    return mutation
}