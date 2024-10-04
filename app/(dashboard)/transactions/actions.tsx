"use client";

import { Button } from "@/components/ui/button";

import { Edit, Edit2Icon, Trash2Icon } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
    const {onOpen, onClose } = useOpenTransaction();
    

    const deleteMutation = useDeleteTransaction(id);
    const [ConfirmationDialog, confirm] = useConfirm(
      "Are you sure?",
      "You are about to delete this transaction"
    );
    
    const handleDelete = async () => {
      const ok = await confirm();
  
      if (ok) {
        deleteMutation.mutate(undefined, {
          onSuccess:()=> {
            onClose();
          }
        });
      }
    };
    
    return (
      <>
        <ConfirmationDialog />
        <div className="flex">
            <Edit2Icon onClick={() => onOpen(id)} className="cursor-pointer size-4 mr-1 text-blue-600" />
            <Trash2Icon onClick={() => handleDelete()} className={`cursor-pointer size-4 ml-2 text-red-600 ${deleteMutation.isPending ? 'text-gray-400' : 'text-red-600'}`} />
        </div>
      </>   
  );
};
