import { useState } from "react";
import { useRouter } from "expo-router";

import usePendingPaymentsStudent from "./usePendingPaymentsStudent";
import { showToast } from '../../components/Toast';

const usePendingPaymentsScreen = () => {
    const { tutorials, loading, error, refreshTutorials, handleCancelTutorial } = usePendingPaymentsStudent();
    const router = useRouter();

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedTutoriaId, setSelectedTutoriaId] = useState<number | null>(null);

    const confirmCancel = async () => {
        if (selectedTutoriaId !== null) {
            try {
                await handleCancelTutorial(selectedTutoriaId);
                showToast("success", "La tutoría ha sido cancelada correctamente.");
            } catch (err) {
                showToast("error", "No se pudo cancelar la tutoría. Inténtalo nuevamente.");
            } finally {
                setShowCancelModal(false);
                refreshTutorials();
            }
        }
    };

    const navigateToConfirmPayment = (tutorial: any) => {
        router.push({
            pathname: "../(drawer)/payments/_confirmPayments",
            params: {
                tutorial: JSON.stringify(tutorial),
            },
        });
    };

    return {
        tutorials,
        loading,
        error,
        refreshTutorials,
        showCancelModal,
        setShowCancelModal,
        selectedTutoriaId,
        setSelectedTutoriaId,
        confirmCancel,
        navigateToConfirmPayment,
    };
};

export default usePendingPaymentsScreen;