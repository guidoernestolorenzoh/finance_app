import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"

import { z } from "zod";

import { insertCategoriesSchema } from "@/db/schema";
import { useNewCategory } from "../hooks/use-new-category";
import { useCreateCategory } from "../api/use-create-category";
import { CategoryForm } from "./category-form";


const formSchema = insertCategoriesSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
  const {isOpen, onClose} = useNewCategory();
  const mutation = useCreateCategory();
  
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    })
  };

  const onDelete = () => {
    console.log("Cuenta eliminada");
    onClose(); 
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>      
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>Create a new category.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm 
          onSubmit={onSubmit} 
          onDelete={onDelete} 
          disabled={mutation.isPending}
          defaultValues={{
            name: ""
          }}
        /> 
      </SheetContent>
    </Sheet>
  );
}
