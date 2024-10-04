"use client";

import { Button } from "@/components/ui/button";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

import { Edit, Edit2Icon, Trash2Icon } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
    const {onOpen, onClose } = useOpenAccount();
    

    const deleteMutation = useDeleteAccount(id);
    const [ConfirmationDialog, confirm] = useConfirm(
      "Are you sure?",
      "You are about to delete this account"
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
