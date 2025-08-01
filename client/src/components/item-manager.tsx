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
          <button className="btn-outline-minimal w-full py-3">
            <Plus className="mr-2 h-4 w-4" />
            Create New Item
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {editingItem ? "Edit Item" : "Create New Item"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {editingItem ? "Update your item details" : "Create a new item for your account"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="itemName" className="block text-sm font-medium mb-2">
                Item Name
              </label>
              <Input
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="itemDescription" className="block text-sm font-medium mb-2">
                Description (Optional)
              </label>
              <Textarea
                id="itemDescription"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="Enter item description"
                rows={3}
                className="w-full"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                className="btn-outline-minimal"
                onClick={() => setShowCreateDialog(false)}
              >
                Cancel
              </button>
              <button
                className="btn-minimal"
                onClick={editingItem ? handleUpdateItem : handleCreateItem}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editingItem ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Items List */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="card-minimal p-8">
            <div className="text-center text-muted-foreground">
              <p>No items yet. Create your first item!</p>
            </div>
          </div>
        ) : (
          items.map((item: Item) => (
            <div key={item.id} className="card-minimal p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">{item.name}</h3>
                  {item.description && (
                    <p className="text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 mt-3">
                    <span className="text-sm text-muted-foreground">
                      Created {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <div className={`status-badge ${item.isActive ? "active" : "inactive"}`}>
                      {item.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="btn-outline-minimal"
                    onClick={() => startEditing(item)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    className="btn-outline-minimal text-red-600 hover:text-red-700"
                    onClick={() => deleteMutation.mutate(item.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Usage Info */}
      <div className="card-minimal p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Items Used: {itemCount}
          </span>
          <div className={`status-badge ${isPro ? "active" : "inactive"}`}>
            {isPro ? "Pro" : "Free"} {isPro ? "(Unlimited)" : "(1 item limit)"}
          </div>
        </div>
      </div>
    </div>
  );
}