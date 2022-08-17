export enum LiquorInventoryMessages {
    liquorAdditionSuccess = "New liquor has been added to the inventory",
    liquorAdditionError = "Error adding new liquor. Make sure that this liquor is not already in the table",
    liquorAdditionWarning = "New liquor was not added to the database",
    inventoryUpdateWarning = "The quantity of the selected liquor was not changed",
    inventoryUpdateSuccess = "The quantity of this liquor has been updated",
    inventoryUpdateError = "Error updating the quantity of this liquor",
    inventoryDeletionSuccess = "Liquor deletion was successful",
    inventoryDeletionError = "Error deleting this liquor from inventory",
    inventoryDeletionWarning = "Liquor deletion has not occurred",
}