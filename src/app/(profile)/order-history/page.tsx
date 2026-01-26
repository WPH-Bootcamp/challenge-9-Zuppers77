import { Suspense } from "react";
import OrderHistoryContent from "./OrderHistoryContent";

export default function OrderHistoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderHistoryContent />
    </Suspense>
  );
}
