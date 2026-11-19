import { create } from 'zustand';

type State = {
    // Auctions deleted by this client that SearchService may not have processed yet
    deletedIds: string[];
}

type Actions = {
    markDeleted: (id: string) => void;
}

export const useAuctionStore = create<State & Actions>((set) => ({
    deletedIds: [],

    markDeleted: (id: string) => {
        set((state) => state.deletedIds.includes(id)
            ? state
            : { deletedIds: [...state.deletedIds, id] });
    }
}));
