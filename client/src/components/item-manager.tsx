import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trash2, Edit3, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Item, InsertItem } from "@shared/schema";

interface ItemManagerProps {
  isPro: boolean;
  itemCount: number;
  onItemCreated?: () => void;
}

export function ItemManager({ isPro, itemCount, onItemCreated }: ItemManagerProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const { toast } = useToast();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["/api/items"],
    enabled: true,
  });

  const createMutation = useMutation({
    mutationFn: async (itemData: InsertItem) => {
      return await apiRequest({
        url: "/api/items",
        method: "POST",
        body: itemData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
      setShowCreateDialog(false);
      setItemName("");
      setItemDescription("");
      toast({
        title: "Success",
        description: "Item created successfully!",
      });
      onItemCreated?.();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create item",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest({
        url: `/api/items/${id}`,
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
      toast({
        title: "Success",
        description: "Item deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete item",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Item> }) => {
      return await apiRequest({
        url: `/api/items/${id}`,
        method: "PATCH",
        body: updates,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
      setEditingItem(null);
      toast({
        title: "Success",
        description: "Item updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update item",
        variant: "destructive",
      });
    },
  });

  const handleCreateItem = () => {
    if (!itemName.trim()) {
      toast({
        title: "Error",
        description: "Item name is required",
        variant: "destructive",
      });
      return;
    }

    if (!isPro && itemCount >= 1) {
      toast({
        title: "Upgrade Required",
        description: "Free users can only create 1 item. Upgrade to Pro for unlimited items.",
        variant: "destructive",
      });
      return;
    }

    const itemData: InsertItem = {
      name: itemName,
      description: itemDescription || null,
      data: {},
      metadata: {},
    };

    createMutation.mutate(itemData);
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;

    updateMutation.mutate({
      id: editingItem.id,
      updates: {
        name: itemName,
        description: itemDescription || null,
      },
    });
  };

  const startEditing = (item: Item) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemDescription(item.description || "");
    setShowCreateDialog(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setItemName("");
    setItemDescription("");
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading items...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Create Item Button */}
      <Dialog
        open={showCreateDialog}
        onOpenChange={(open) => {
          setShowCreateDialog(open);
          if (!open) resetForm();
        }}
      >
        <DialogTrigger asChild>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Create New Item
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Item" : "Create New Item"}
            </DialogTitle>
            <DialogDescription>
              {editingItem ? "Update your item details" : "Create a new item for your account"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="itemName" className="block text-sm font-medium mb-1">
                Item Name
              </label>
              <Input
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
              />
            </div>
            <div>
              <label htmlFor="itemDescription" className="block text-sm font-medium mb-1">
                Description (Optional)
              </label>
              <Textarea
                id="itemDescription"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="Enter item description"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={editingItem ? handleUpdateItem : handleCreateItem}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editingItem ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Items List */}
      <div className="grid gap-4">
        {items.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <p>No items yet. Create your first item!</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          items.map((item: Item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    {item.description && (
                      <CardDescription className="mt-1">
                        {item.description}
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditing(item)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMutation.mutate(item.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                  <Badge variant="outline">
                    {item.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Usage Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Items Used: {itemCount}
            </span>
            <Badge variant={isPro ? "default" : "secondary"}>
              {isPro ? "Pro" : "Free"} {isPro ? "(Unlimited)" : "(1 item limit)"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}