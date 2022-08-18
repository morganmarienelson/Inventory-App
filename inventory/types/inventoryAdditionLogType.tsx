export interface InventoryAdditionLogType {
    employeeName: string,
    date: string,
    vendor: string,
    liquorName: string,
    quantityBefore: number,
    quantityAdded: number,
    quantityAfter: number,
}