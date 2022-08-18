export interface InventoryRemovalLogType {
    employeeName: string,
    date: string,
    vendor: string,
    liquorName: string,
    quantityBefore: number,
    quantityRemoved: number,
    quantityAfter: number,
}