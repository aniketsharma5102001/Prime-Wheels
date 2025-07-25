import { Button } from "@/components/ui/button";
import { MdOutlineLocalOffer } from "react-icons/md";
function Pricing({ carDetail }) {
  return (
    <div className="p-10 rounded-xl border shadow-md">
      <h2>Our Price</h2>
      <h2 className="font-bold text-4xl mb-4">${carDetail?.SellingPrice ? carDetail.SellingPrice : 'Loading...'}</h2>
      <Button className="w-full" size="lg" > <MdOutlineLocalOffer className="text-lg mr-2" /> Make an Offer Price </Button>
    </div>
  );
}

export default Pricing;