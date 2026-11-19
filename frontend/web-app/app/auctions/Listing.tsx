'use client';

import { Auction, PagedResult } from "@/types";
import { useEffect, useState } from "react";
import qs from "query-string";
import AuctionCard from "./AuctionCard";
import AppPagination from "../Components/AppPagination";
import { getData } from "../actions/auctionAction";
import Filters from "./Filters";
import EmptyFilter from "../Components/EmptyFilter";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/shallow";
import { useAuctionStore } from "@/hooks/useAuctionStore";

export default function Listings() {
    const [data, setData] = useState<PagedResult<Auction>>();
    const params = useParamsStore(useShallow(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy,
        seller: state.seller,
        winner: state.winner,
    })));
    const setParams = useParamsStore((state) => state.setParams);
    const deletedIds = useAuctionStore((state) => state.deletedIds);
    const url = qs.stringifyUrl({url:'', query: params}, {skipEmptyString: true});

    function setPageNumber(pageNumber: number) {
        setParams({ pageNumber });
    }

    useEffect(() => {
        getData(url).then((data) => {
            setData(data);
        });
    }, [url]);

    if (!data) return <h3>Loading....</h3>

    const auctions = data.results.filter(a => !deletedIds.includes(a.id));

    return (
        <>
        <Filters />
        {data.totalCount === 0 || auctions.length === 0 ? (
            <EmptyFilter showReset />
        ) : (
            <>
                <div className="grid grid-cols-4 gap-6">
                    {auctions.map((auction: Auction) => (
                        <AuctionCard key={auction.id} auction={auction} />
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    <AppPagination 
                        pageChanged={setPageNumber} 
                        currentPage={params.pageNumber}
                        pageCount={data.pageCount} />
                </div>
            </>
        )}
        </>
    )
}