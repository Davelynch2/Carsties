'use client';

import { deleteAuction } from "@/app/actions/auctionAction";
import { Button } from "flowbite-react/components/Button";
import { Spinner } from "flowbite-react/components/Spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuctionStore } from "@/hooks/useAuctionStore";

type Props = {
    id: string
}
    
export default function DeleteButton({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const markDeleted = useAuctionStore((state) => state.markDeleted);

  function handleDelete() {
    setLoading(true);
    deleteAuction(id)
    .then(res =>{
        if (res.error) throw res.error;
        markDeleted(id);
        router.push('/');
    })
    .catch (error => {
        toast.error(error.status + ' ' + error.message);
    })
    .finally(() => 
        setLoading(false));
  };

  return (
    <Button outline color='red' onClick={handleDelete}>
        {loading && <Spinner size="sm" className="mr-3" />}
        Delete Auction
    </Button>
  );
}