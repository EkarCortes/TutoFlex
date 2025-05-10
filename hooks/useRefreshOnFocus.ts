import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

export function useRefreshOnFocus(refreshFn: () => void) {
    useFocusEffect(
        useCallback(() => {
            refreshFn(); 
        }, []) 
    );
}