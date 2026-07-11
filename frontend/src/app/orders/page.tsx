import StoreFilter from "@/components/order/StoreFilter";
import OrdersTable from "@/components/order/OrdersTable";

export default function OrdersPage() {
  return (
    <>
      <h2>Orders</h2>

      <StoreFilter />

      <OrdersTable />
    </>
  );
}