import { createContext, useContext, useState } from "react";

interface MarketProductImageContextType {
    previewImage: string[];
    setPreviewImage: React.Dispatch<React.SetStateAction<string[]>>;
    isProcessing: boolean;
    setIsProcessing: (isProcessing: boolean) => void;
}

const MarketProductImageContext = createContext<MarketProductImageContextType>({
    previewImage: [],
    setPreviewImage: () => {},
    isProcessing: false,
    setIsProcessing: () => {}
});

export function MarketProductImageProvider({ children }: { children: React.ReactNode }) {

    const [previewImage, setPreviewImage] = useState<string[]>([]);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    return (
        <MarketProductImageContext.Provider value={{
            previewImage,
            isProcessing,
            setPreviewImage,
            setIsProcessing
        }}>
            {children}
        </MarketProductImageContext.Provider>
    )
}

export function useMarketProductImage() {
    const context = useContext(MarketProductImageContext);
    if (!context) {
        throw new Error('useMarketProductImage must be used within a MarketProductImageProvider');
    }
    return context;
}